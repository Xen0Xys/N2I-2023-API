const argon2 = require("argon2");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

/**
 * Converts a content to a string
 * @param {any} content The content to convert
 * @returns {string} The stringify content
 */
function stringify(content){
    if(!content) return "";
    if(typeof content !== "string") return content.toString();
    return content;
}

/**
 * Gets the SHA-256 sum of a content
 * @param {any} content The content to hash
 * @returns {string} The SHA-256 sum
 */
function getSum(content){
    content = stringify(content);
    return crypto.createHash("sha256").update(content).digest("hex");
}

/**
 * Generates a JWT token
 * @param {any} content The content to sign
 * @param {number} expiresIn The expiration time in seconds
 * @param {string} jwtKey The private key
 * @param {boolean} [symmetric=true] True if the token encryption should be symmetric, false otherwise
 * @param {string} [privateEncryptionKey] The private encryption key
 * @returns {string} The JWT token
 */
function generateJWT(content, expiresIn, jwtKey, symmetric = true, privateEncryptionKey = undefined){
    const algorithm = symmetric ? "HS512" : "RS512";
    if(symmetric)
        return jwt.sign(content, jwtKey, {expiresIn, algorithm});
    else
        return jwt.sign(content, {key: jwtKey, passphrase: privateEncryptionKey}, {expiresIn, algorithm});
}

/**
 * Verifies a JWT token
 * @param {string} token The token to verify
 * @param {string} jwtKey The private key
 * @returns {object} The decoded token
 */
function verifyJWT(token, jwtKey){
    const decodedToken = jwt.decode(token, {complete: true});
    const symmetric = decodedToken.header.alg === "HS512";
    const algorithm = symmetric ? "HS512" : "RS512";
    return jwt.verify(token, jwtKey, {algorithms: algorithm});
}

/**
 * Hashes a content like passwords with Argon2
 * @param {any} content The content to hash
 * @param {number} [cost=10] The cost of the hash
 * @returns {Promise<string>} The hashed content
 */
async function hashPassword(content, cost = 10){
    content = stringify(content);
    return await argon2.hash(content, {
        type: argon2.argon2id,
        timeCost: cost
    });
}

/**
 * Compares a hashed content with a plain text content
 * @param {string} hash The hashed content
 * @param {any} content The plain text content
 * @returns {Promise<boolean>} True if the content matches the hash, false otherwise
 */
async function comparePassword(hash, content){
    content = stringify(content);
    return await argon2.verify(hash, content);
}

/**
 * Encrypts a content with AES-256-CBC
 * @param {any} content The content to encrypt
 * @param {string} encryptionKey The encryption key
 * @param {number} [timeCost=200000] The time cost
 * @returns {Promise<string>} The encrypted content
 */
async function encryptSymmetric(content, encryptionKey, timeCost = 200000){
    content = stringify(content);
    const salt = crypto.randomBytes(32);
    const key = crypto.pbkdf2Sync(encryptionKey, salt, timeCost, 64, "sha512");
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key.subarray(0, 32), iv);
    let encrypted = cipher.update(content, "utf-8", "hex");
    encrypted += cipher.final("hex");
    const hmac = crypto.createHmac("sha256", key.subarray(32));
    hmac.update(`${salt.toString("hex")}:${iv.toString("hex")}:${encrypted}`);
    const digest = hmac.digest("hex");
    return `${salt.toString("hex")}:${iv.toString("hex")}:${encrypted}:${digest}`;
}

/**
 * Decrypts a content with AES-256-CBC
 * @param {string} encryptedContent The encrypted content
 * @param {string} encryptionKey The encryption key
 * @param {number} [timeCost=200000] The time cost
 * @returns {Promise<string>} The decrypted content
 */
async function decryptSymmetric(encryptedContent, encryptionKey, timeCost = 200000){
    const [saltString, ivString, encryptedString, digest] = encryptedContent.split(":");
    const salt = Buffer.from(saltString, "hex");
    const key = crypto.pbkdf2Sync(encryptionKey, salt, timeCost, 64, "sha512");
    const iv = Buffer.from(ivString, "hex");
    const hmac = crypto.createHmac("sha256", key.subarray(32));
    hmac.update(`${saltString}:${ivString}:${encryptedString}`);
    const calculatedDigest = hmac.digest("hex");
    if (calculatedDigest !== digest)
        throw new Error("Integrity check failed");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key.subarray(0, 32), iv);
    let decrypted = decipher.update(encryptedString, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
}

/**
 * Generates a key pair
 * @param {number} [modulusLength=4096] The modulus length
 * @param {string || null} [privateEncryptionKey] The private encryption key
 * @returns {crypto.KeyPairSyncResult<string, string>} The key pair
 */
function generateKeyPair(modulusLength = 4096, privateEncryptionKey = null){
    if(!privateEncryptionKey)
        console.warn("No private encryption key provided, the private key will not be encrypted");
    let privateKeyEncodingOptions = {
        type: "pkcs8",
        format: "pem"
    };
    if(privateEncryptionKey){
        privateKeyEncodingOptions.cipher = "aes-256-cbc";
        privateKeyEncodingOptions.passphrase = privateEncryptionKey;
    }
    return crypto.generateKeyPairSync("rsa", {
        modulusLength: modulusLength,
        publicKeyEncoding: {
            type: "spki",
            format: "pem"
        },
        privateKeyEncoding: privateKeyEncodingOptions
    });
}

/**
 * Encrypts a content with an asymmetric key
 * @param {any} content The content to encrypt
 * @param {string} publicKey The public key
 * @returns {string} The encrypted content
 */
function encryptAsymmetric(content, publicKey){
    const buffer = Buffer.from(stringify(content), "utf-8");
    const encrypted = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    }, buffer);
    return encrypted.toString("base64");
}

/**
 * Decrypts a content with an asymmetric key
 * @param {string} encryptedContent The encrypted content
 * @param {string} privateKey The private key
 * @param {string} [privateEncryptionKey] The private encryption key
 * @returns {string} The decrypted content
 */
function decryptAsymmetric(encryptedContent, privateKey, privateEncryptionKey = undefined){
    const buffer = Buffer.from(encryptedContent, "base64");
    if(!privateEncryptionKey)
        return crypto.privateDecrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        }, buffer).toString("utf-8");
    else
        return crypto.privateDecrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            passphrase: privateEncryptionKey
        }, buffer).toString("utf-8");
}

module.exports = {
    getSum,
    generateJWT,
    verifyJWT,
    hashPassword,
    comparePassword,
    encryptSymmetric,
    decryptSymmetric,
    generateKeyPair,
    encryptAsymmetric,
    decryptAsymmetric
};

/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("info_data", [
            {
                id: 1,
                type: "image",
                url: "https://www.meta-media.fr/wp-content/uploads/sites/33/2019/08/couv-climat.jpg",
                title: "Le réchauffement climatique, un complot ?",
                content: "Pour certains, la crise climatique n’est qu’une construction de scientifiques pour justifier leurs financements, voire un complot de gouvernements visant à contrôler les peuples. Cette théorie complotiste induit une organisation complexe, coordonnée par des gouvernements successifs dans de nombreux pays avec la complicité de milliers de scientifiques. \n" +
                    "\n" +
                    "Chercheur du CNRS à l’Institut des géosciences de l’environnement, Gerhard Krinner est climatologue et membre de l’équipe à l’origine du rapport du GIEC publié en août dernier. “On sait depuis plus de cent ans que le CO2 a un effet sur le climat et que ce dernier allait changer”, explique Gerhard Krinner. Il ajoute que des prédictions plus précises ont été faites il y a plus de cinquante ans. “Ces projections sont devenues la réalité qu’on observe. C’est impossible qu’il y ait une conspiration internationale d’une telle envergure”, assure le chercheur. Le climatologue affirme également qu’on ne peut pas fausser les données de milliers de personnes, “ou quelqu’un finirait par parler”, ironise-t-il. \n" +
                    "\n" +
                    "De plus, ce sont des dizaines de milliers d’études scientifiques qui ont abouti au consensus quasi-unanime sur la réalité du changement climatique. Ce processus est notamment illustré par les travaux du GIEC, ouvert à tous les pays membres de l’ONU. Créé en 1988, le GIEC réunit bénévolement des centaines de scientifiques qui passent en revue l’état des connaissances avec une méthodologie et des références publiques. ",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                type: "image",
                url: "https://www.bioconsomacteurs.org/sites/default/files/styles/visuel-principal/public/dossiers/fake_news.png?itok=ykK4G6Ow",
                title: "Les causes humaines sont-elles à prouver ?",
                content: "Certains climato-sceptiques mettent en doute l’origine humaine du réchauffement climatique. Et ce malgré les émissions de gaz à effet de serre causées par les activités humaines depuis la révolution industrielle. \n" +
                    "\n" +
                    "“La technique appliquée est de demander quelque chose d’impossible aux climatologues”, déplore Gerhard Krinner. Pour prouver le sens irréfutable, “il faudrait avoir une centaine de planètes Terre identiques”, notifie-t-il. Puis il faudrait soumettre cinquante de ces planètes à un forçage de CO2 anthropogénique et les comparer aux cinquante autres. “Il faudrait une étude comme on en fait en médecine, avec cent patients qu’on peut soumettre à un protocole expérimental. Ce qui est impossible en géosciences et astronomie”, assure le chercheur. ",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                type: "image",
                url: "https://cdn.britannica.com/85/152185-138-B6EAB2E7/role-orbit-axis-Earth-seasons.jpg",
                title: "Le réchauffement climatique modifie-t-il l'axe de rotation de la terre ?",
                content: "La théorie de Milutin Milankovitch, publiée en 1941, rend compte de l'alternance des cycles glaciaires et interglaciaires durant le quaternaire. Cette théorie des cycles est fiable pour expliquer une glaciation et/ou un réchauffement à l'échelle de dizaines de milliers d'années ou de centaines de milliers d'années mais elle n'est pas adaptée pour expliquer la hausse rapide des températures observée au cours des deux derniers siècles. Ces 200 dernières années ne correspondent en rien à une échelle de temps géologique.",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 4,
                type: "image",
                url: "https://www.rts.ch/2012/12/24/10/42/4531335.image?w=1280&h=720",
                title: "Nous n'avons pas à craindre la fonte des glaces non ?",
                content: "Selon les scientifiques, le niveau des mers et des océans pourrait s'élever d'un mètre voire plus d'ici 2100 en raison du réchauffement climatique en cours.\n" +
                    "La fonte totale d'un iceberg flottant en mer ne fait pas monter le niveau de la mer. En revanche, les icebergs proviennent d'une accumulation de neige se transformant en glace sur continents, glace qui s'écoule lentement vers les côtes. Donc lorsque la glace constituant les icebergs se sépare du socle rocheux avant de se détacher ou de se mettre à flotter (on parle alors d'ice shelves en anglais ou de barrières de glace), il y a bien hausse du niveau de la mer. /ou un réchauffement à l'échelle de dizaines de milliers d'années ou de centaines de milliers d'années mais elle n'est pas adaptée pour expliquer la hausse rapide des températures observée au cours des deux derniers siècles. Ces 200 dernières années ne correspondent en rien à une échelle de temps géologique.",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 5,
                type: "image",
                url: "https://www.tzcld.fr/faq/wp-content/uploads/2021/03/Fabrique_Du_Consensus.jpg",
                title: "Le réchauffement climatique ne fait pas totalement consensus, si ?",
                content: "Déjà diagnostiqué dans les années 1990, le réchauffement climatique s’est poursuivi depuis. Les rapports successifs du Giec n'ont cessé de réaffirmer le consensus scientifique autour de ce réchauffement global. Entre 2009 et 2015, le consensus quant à son origine anthropique se situait autour de 97 %. Une évaluation parue dans le Bulletin of Science, Technology & Society le 20 novembre 2019 a poussé ce taux encore un peu plus loin. Au total, ce sont plus de 11 600 articles publiés sur le sujet dans des revues scientifiques spécialisées, entre le 1er janvier et début août 2019, qui ont été examinés. Or, il apparaît que 100 % des articles soutiennent l’idée d’une cause anthropique au réchauffement global actuel.",
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize){
        await queryInterface.bulkDelete("info_data", {
            id: [1, 2, 3, 4, 5],
        });
    }
};

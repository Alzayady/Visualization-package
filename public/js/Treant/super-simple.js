// var simple_chart_config = {
//   chart: {
//     container: "#OrganiseChart-simple",
//   },

//   animateOnInit: true,
//   nodeStructure: {
//     text: { name: "10" },
//     HTMLclass: "red",
//     children: [
//       {
//         text: { name: "1" },
//       },
//       {
//         text: { name: "15" },

//         children: [
//           {
//             text: { name: "" },
//             HTMLclass: "pseudo",
//           },

//           {
//             text: { name: "101" },
//           },
//         ],
//       },
//     ],
//   },
// };

// var chart_config = {
//   chart: {
//     container: "#collapsable-example",

//     animateOnInit: true,

//     node: {
//       collapsable: true,
//     },
//     animation: {
//       nodeAnimation: "easeOutBounce",
//       nodeSpeed: 700,
//       connectorsAnimation: "bounce",
//       connectorsSpeed: 700,
//     },
//   },
//   nodeStructure: {
//     image: "img/malory.png",
//     children: [
//       {
//         image: "img/lana.png",
//         collapsed: true,
//         children: [
//           {
//             image: "img/figgs.png",
//           },
//         ],
//       },
//       {
//         image: "img/sterling.png",
//         childrenDropLevel: 1,
//         children: [
//           {
//             image: "img/woodhouse.png",
//           },
//         ],
//       },
//       {
//         pseudo: true,
//         children: [
//           {
//             image: "img/cheryl.png",
//           },
//           {
//             image: "img/pam.png",
//           },
//         ],
//       },
//     ],
//   },
// };

// var config = {
//     container: "#collapsable-example",

//     animateOnInit: true,

//     node: {
//       collapsable: true,
//     },
//     animation: {
//       nodeAnimation: "easeOutBounce",
//       nodeSpeed: 700,
//       connectorsAnimation: "bounce",
//       connectorsSpeed: 700,
//     },
//   },
//   malory = {
//     image: "img/malory.png",
//   },
//   lana = {
//     parent: malory,
//     image: "img/lana.png",
//   };

// figgs = {
//   parent: lana,
//   image: "img/figgs.png",
// };

// (sterling = {
//   parent: malory,
//   childrenDropLevel: 1,
//   image: "img/sterling.png",
// }),
//   (woodhouse = {
//     parent: sterling,
//     image: "img/woodhouse.png",
//   }),
//   (pseudo = {
//     parent: malory,
//     pseudo: true,
//   }),
//   (cheryl = {
//     parent: pseudo,
//     image: "img/cheryl.png",
//   }),
//   (pam = {
//     parent: pseudo,
//     image: "img/pam.png",
//   }),
//   (chart_config = [
//     config,
//     malory,
//     lana,
//     figgs,
//     sterling,
//     woodhouse,
//     pseudo,
//     pam,
//     cheryl,
//   ]);

// new Treant(chart_config, null, $);

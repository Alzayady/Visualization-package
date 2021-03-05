var simple_chart_config = {
  chart: {
    container: "#OrganiseChart-simple",
  },

  animateOnInit: true,
  nodeStructure: {
    text: { name: "10" },
    HTMLclass: "red",
    children: [
      {
        text: { name: "1" },
      },
      {
        text: { name: "15" },

        children: [
          {
            text: { name: "" },
            HTMLclass: "pseudo",
          },

          {
            text: { name: "101" },
          },
        ],
      },
    ],
  },
};

// new Treant(simple_chart_config, null, $);

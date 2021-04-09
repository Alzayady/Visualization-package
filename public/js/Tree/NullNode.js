class NullNode {
  IsPsudo() {
    return true;
  }
  getWrapperNode() {
    return {
      text: {
        name: "",
      },

      HTMLclass: "pseudo",
      connectors: {
        style: {
          stroke: "#8080FF",
          "arrow-end": "block-wide-long",
        },
      },
    };
  }
  getWrapperRoot() {
    let wrappedRoot = {
      chart: {
        container: "#OrganiseChart-simple",
      },
      nodeStructure: [],
    };
    return wrappedRoot;
  }
}

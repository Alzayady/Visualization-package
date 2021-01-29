
var simple_chart_config = {
	chart: {
		container: "#OrganiseChart-simple"
	},
	
	
	nodeStructure: {
		text: { name: "10" },
		HTMLclass :'red',
		children: [
			{
				text: { name: "1" }
			},
			{
				text: { name: "15" },
	
				children:[
					{
						text:{name:""},
						HTMLclass:'pseudo'
					},

					{
						text:{name:"101"}
					}
				]
			}
			
		]
	}

};


var simple_chart_config1 = {
	chart: {
		container: "#OrganiseChart-simple"
	},
	
	
	nodeStructure: {
		text: { name: "100" },
		HTMLclass :'gray',
		children: [
			{
				text: { name: "10" }
			},
			{
				text: { name: "150" },
	
				children:[
					{
						text:{name:""},
						HTMLclass:'pseudo'
					},

					{
						text:{name:"1001"}
					}
				]
			}
			
		]
	}

};


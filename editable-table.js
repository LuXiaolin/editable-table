if(Meteor.isClient) {
	colChanged = new Tracker.Dependency();
	columnNames  = ['col1','col2','col3'];
	tableData = 
		[
			[{id:'r0c0',text:'r0c0',row:0,col:0},{id:'r0c1',text:'r0c1',row:0,col:1},{id:'r0c2',text:'r0c2',row:0,col:2}],
			[{id:'r1c0',text:'r1c0',row:1,col:0},{id:'r1c1',text:'r1c1',row:1,col:1},{id:'r1c2',text:'r1c2',row:1,col:2}],
			[{id:'r2c0',text:'r2c0',row:2,col:0},{id:'r2c1',text:'r2c1',row:2,col:1},{id:'r2c2',text:'r2c2',row:2,col:2}],
		];

	Template.tableTemplate.helpers({
		tableColumnNames: function(){
			return columnNames;
		},
		tableRowData: function(){
			return tableData;
		},
		tableColumnData: function(){
			colChanged.depend();
			return this;
		},

	});

	Template.tableTemplate.events({
		'blur .contentField': function(event){
			var newString = $('#'+this.id).text();
			tableData[this.row][this.col].text = newString;
			console.log('this='+this.text+' tableData['+this.row+']['+this.col+'].text='+tableData[this.row][this.col].text);
			// var element = document.getElementById(this.id);
			// element.innerHTML = newString;
			colChanged.changed();
		},
	});

	Template.tableDivTemplate.helpers({
		tableFieldId: function(){
			colChanged.depend();
			var newString = tableData[this.row][this.col].text
			var element = document.getElementById(this.id);
			if(element){
				element.innerHTML = newString;	
			}
			
			return this.id;
		},
	});


	Template.tableDivTemplate.rendered = function () {
		this.autorun((function(self) {
			return function() {
				colChanged.changed();
			};
		})(this));
	}



}
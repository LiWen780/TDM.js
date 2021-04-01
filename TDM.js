(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.TDM = {}));
}(this, (function (exports) { 'use strict';
	
	
	//----------------------------------------------------------Column
	
	function Column(name)
	{
		this.type = "column";
		this.rows = [];
		this.name = name || "";
	}
	Object.assign(Column.prototype, {
		
		addRow: function(element)
		{
			this.rows.push(element);
		},
		
		addAll: function(array)
		{
			if(array.type == "list")
			{
				for(var i = 0; i < array.size(); i++)
				{
					this.rows.push(array.data[i]);
				}
			}
			else
			{
				for(var i = 0; i < array.length; i++)
				{
					this.rows.push(array[i]);
				}
			}
		}
	});
	//----------------------------------------------------------LIST
	
	function List()
	{
		this.type = "list";
		this.data = [];
	}
	Object.assign(List.prototype, {
		
		add: function(element)
		{
			this.data.push(element);
		},
		
		addAll: function(array)
		{
			for(var i = 0; i < array.length; i++)
			{
				this.data.push(array[i]);
			}
		},
		
		addAt: function(at,element)
		{
			if(typeof(at) == "number")
			{
				this.data[at] = element;
			}
		},
		
		clear: function()
		{
			this.data.splice(0,this.data.length);
		},
		
		size: function()
		{
			return this.data.length;
		},
		
		isEmpty: function()
		{
			if(this.data.length == 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		},
		
		get: function(index)
		{
			if(typeof(index) == "number")
			{
				return this.data[index];
			}
		},
		
		contains: function(element)
		{
			var value = false;
			
			for(var i = 0; i < this.data.length; i++)
			{
				if(this.data[i] == element)
				{
					value = true;
				}
			}
			return value;
		},
		
		remove: function(index)
		{
			if(typeof(index) == "number")
			{
				this.data.splice(index, 1);
			}
		},
		
		indexOf: function(element)
		{
			return this.data.indexOf(element);
		},
		
		lastIndexOf: function(element)
		{
			return this.data.lastIndexOf(element);
		},
		
		toString: function()
		{
			var string = "";
			
			for(var i = 0; i < this.data.length; i++)
			{
				if(i < (this.data.length-1))
				{
					string += this.data[i]+", ";
				}
				else
				{
					string += this.data[i]+".";
				}
			}
			
			return string;
		},
		
		displayAt: function(docu)
		{
			var string = "<ul>";
			
			for(var j = 0; j < this.data.length; j++)
			{
				string += "<li>"+this.data[j]+"</li>";
			}
			string += "</ul>";
			
			docu.innerHTML += string;
		}
	});
	
	//----------------------------------------------------------Table
	
	function Table()
	{
		this.type = "table";
		this.maxColumn = 0;
		this.maxRow = 0;
		this.columns = {};
		this.names = [];
		this.tableGUI = document.createElement("TABLE");
		this.tableGUI.style.textAlign = "center";
		this.tableGUI.style.borderCollapse = "collapse";
		//this.tableGUI.style.wordBreak = "break-all";
	}
	Object.assign(Table.prototype, {

		addColumn: function(name)
		{
			if(typeof(name) == "string" || typeof(name) == "number" || typeof(name) == "boolean")
			{
				this.columns[name] = [];
				
				this.maxColumn = Object.keys(this.columns).length;
				
				this.names.push(name);
			}
		},
		
		addRow: function(col_name, element)
		{
			if(typeof(col_name) == "string")
			{
				this.columns[col_name].push(element);
				
				if(this.columns[col_name].length > this.maxRow)
				{
					this.maxRow = this.columns[col_name].length;
				}
			}
		},
		
		updateAt: function(col_name, row, element)
		{
			if(typeof(col_name) == "string" && typeof(row) == "number")
			{
				this.columns[col_name][row] = element;
			}
		},
		
		remove: function(col_name, row)
		{
			if(typeof(col_name) == "string" && typeof(row) == "number")
			{
				this.columns[col_name][row] = "";
			}
		},
		
		get: function(col_name, row)
		{
			if(typeof(col_name) == "string" && typeof(row) == "number")
			{
				return this.columns[col_name][row];
			}
			else
			{
				return "";
			}
		},
		
		columnSize: function()
		{
			return this.maxColumn;
		},
		
		rowSize: function()
		{
			return this.maxRow;
		},
		
		displayAt: function(docu, width, height)
		{
			var string = "";
	
			//column name as title
			string += "<tr style = 'background-color: grey; color: white;'>";
			for(var n = 0; n < this.names.length; n++)
			{
				string += "<td style='border: 1px solid black; border-collapse: collapse; word-break: break-all;'>"+this.names[n]+"</td>";
			}
				
			string += "</tr>";
			
			for(var r = 0; r < this.maxRow; r++)
			{
				string += "<tr>";
				
				for(var c = 0; c < this.maxColumn; c++)
				{
					if(this.columns[this.names[c]][r] == undefined)
					{
						string += "<td style = 'border: 1px solid black; border-collapse: collapse; word-break: break-all;'></td>";
					}
					else
					{
						string += "<td style = 'border: 1px solid black; border-collapse: collapse; word-break: break-all;'>"+this.columns[this.names[c]][r]+"</td>";
					}
				}
				string += "</tr>";
			}
			
			this.tableGUI.innerHTML = string;
			
			if(typeof(width) == "number")
			{
				this.tableGUI.style.width = width+"px";
			}
			if(typeof(height) == "number")
			{
				this.tableGUI.style.height = height+"px";
			}
			
			docu.appendChild(this.tableGUI);
		}
	});
	
	//---------------------------------------------------------------------------------DATATOSTRING
	
	
	
	exports.List = List;
	exports.Table = Table;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
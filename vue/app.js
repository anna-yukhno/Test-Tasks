window.onload = function() {
	var tasks = JSON.parse(window.localStorage.getItem('taskList')) || [];
	Vue.component('todo-item', {
		template: `
		  <tr>
		     <td width="50">
		      {{ task.id }}
		     </td>
		     <td>
		      {{ task.name }}
		     </td>
		     <td width="30">
		     		<input type="checkbox" v-model="task.done">
		     </td>
		     <td width="30">
		     		<button v-on:click="$emit('remove')">[X]</button>
		     </td>
		    </tr>
		  `,
	  	props: ['task']
	})
	var vm = new Vue({
	  el: '#todo-list',
	  data: {
	    newTodoText: '',
	    todos: tasks,
	    sortFlag: true,
	    isDone: false
	  },
	  methods: {
	    addNewTask: function () {
	    	var name = this.newTodoText;
	    	var taskId = this.todos.length? (this.todos[this.todos.length-1].id+1) : 1;
		     this.todos.push({
		     	id: taskId,
		     	name:	name,
		     	done: false
		     }
		     );
		     this.newTodoText = '';
	    },
	    removeAll: function () {
	    		if(confirm('Are you sure you want to delete all of tasks?')){
					this.todos.splice(0, this.todos.length);
			}
	    }
	  },
	    watch: {
	  	todos: function (newVal, oldVal) {
	  		window.localStorage.setItem('taskList', JSON.stringify(this.todos));
	  	},
	  	isDone: function () {
		    	for (var i = 0; i < this.todos.length; i++) {
		    		this.todos[i].done = this.isDone;
		    	}
	    }
	  }
	})

}


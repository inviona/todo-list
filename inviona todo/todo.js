var todo = {
  data: [], // mban  listës e detyrave
  
  //  NGARKONI TË DHËNAT NGA RUAJTJA LOKALE NË TODO.DATA
  load: function () {
    
    if (localStorage.list == undefined) {
      localStorage.list = "[]";
    }
    // todo.data ka formen e :
    // [0] = Task
    // [1] = Status : 0 nuk është bërë, 1 i përfunduar, 2 i anuluar
    todo.data = JSON.parse(localStorage.list);
    todo.list();
  },

  // RUANI TË DHËNAT AKTUALE NE localStorage
  save: function () {

    localStorage.list = JSON.stringify(todo.data);
    todo.list();
  },

  list: function () {
    // Pastron listat e vjetra
    var container = document.getElementById("todo-list");
    container.innerHTML = "";

    // krijon listen
    if (todo.data.length > 0) {
      var row = "", el = "";
      for (var key in todo.data) {
        // rrjesti me items
        row = document.createElement("div");
        row.classList.add("todo-row");
        row.dataset.id = key;

        // teksti
        el = document.createElement("div");
        el.classList.add("todo-item");
        if (todo.data[key][1] == 1) {
          el.classList.add("done");
        }
        if (todo.data[key][1] == 2) {
          el.classList.add("cx");
        }
        el.innerHTML = todo.data[key][0];
        row.appendChild(el);

        // butoni i anullimit
        el = document.createElement("input");
        el.setAttribute("type", "button");
        el.value = "\u2716";
        el.classList.add("todo-cx");
        el.addEventListener("click", function () {
          todo.status(this, 2);
        });
        row.appendChild(el);

        
        el = document.createElement("input");
        el.setAttribute("type", "button");
        el.value = "\u2714"; // tiku
        el.classList.add("todo-ok");
        el.addEventListener("click", function () {
          todo.status(this, 1);
        });
        row.appendChild(el);

        // shtojm rrjeht tek lista
        container.appendChild(row);
      }
    }
  },

  // shtojm nje items tjeter
  add: function () {

    let item = document.getElementById("todo-item");
    todo.data.push([item.value, 0]);
    item.value = "";
    todo.save();
  },


  status: function (el, stat) {

    todo.data[el.parentElement.dataset.id][1] = stat;
    todo.save();
  },

  //  DELETE ITEM
  del: function (type) { if (confirm("Delete tasks?")) {
      //  DELETE ALL
      if (type == 0) {
        todo.data = [];
        todo.save();
      }
      
      // heqim vetem veprimet e perfunduara
      else {
        todo.data = todo.data.filter(row => row[1]==0);
        todo.save();
      }
  }}
};


window.addEventListener("load", function () {
  document.getElementById("todo-delall").addEventListener("click", function () {
    todo.del(0);
  });
  document.getElementById("todo-delcom").addEventListener("click", function () {
    todo.del(1);
  });
  document.getElementById("todo-add").addEventListener("submit", function (evt) {
    evt.preventDefault();
    todo.add();
  });
  todo.load();
});
/* Name: Tashia Boddu
Email: Tashia_Boddu@student.uml.edu
Project Created: November 26th 2022
Purpose of Project: Understand and create a dynamic table that
interacts with the user. Learn JS and JQuery to integrate validation */

$().ready(function () {
  // set slider values
  $(function () {
    $("#slide_minCol").slider({
      value: 1,
      min: -50,
      max: 50,
      slide: function (event, ui) {
        $("#mincol").val(ui.value);
        auto_submit();
      }
    });
    $("#slide_maxCol").slider({
      value: 1,
      min: -50,
      max: 50,
      slide: function (event, ui) {
        $("#maxcol").val(ui.value);
        auto_submit();
      }
    });
    $("#slide_minRow").slider({
      value: 1,
      min: -50,
      max: 50,
      slide: function (event, ui) {
        $("#minrow").val(ui.value);
        auto_submit();
      }
    });
    $("#slide_maxRow").slider({
      value: 1,
      min: -50,
      max: 50,
      slide: function (event, ui) {
        $("#maxrow").val(ui.value);
        auto_submit();
      }
    });
  })

  /* Validation of form required and number are true and min and max have set
  values */
  $("#signupForm").validate({
    rules: {
      mincol: {
        required: true,
        number: true,
        min: -50,
        max: 50,
      },
      maxcol: {
        required: true,
        number: true,
        min: -50,
        max: 50,
      },
      minrow: {
        required: true,
        number: true,
        min: -50,
        max: 50,
      },
      maxrow: {
        required: true,
        number: true,
        min: -50,
        max: 50,
      }
    },

    /* Messages displayed explaning what the error is and how to fix it
    message is indicated on the same line as the box to indicate it is this
    box that needs to be fixed */
    messages: {
      mincol: {
        required: " Enter A Numerical Value ",
        number: " Enter A Number ",
        min: " Enter A Number Greater Than -50",
        max: " Enter A Number Less Than 50",
      },
      maxcol: {
        required: " Enter A Numerical Value ",
        number: " Enter A Number ",
        min: " Enter A Number Greater Than -50",
        max: " Enter A Number Less Than 50",
      },
      minrow: {
        required: " Enter A Numerical Value ",
        number: " Enter A Number ",
        min: " Enter A Number Greater Than -50",
        max: " Enter A Number Less Than 50",
      },
      maxrow: {
        required: " Enter A Numerical Value ",
        number: " Enter A Number ",
        min: " Enter A Number Greater Than -50",
        max: " Enter A Number Less Than 50",
      }
    }
  });

  // Calls tabs when #tabs element's html is changed
  $("#tabs").on('DOMSubtreeModified', function () {
    $("#tabs").tabs();
  });

  /* If all input is correct create a table */ 
  $('#signupForm').submit(function (event) {
    event.preventDefault();
    if ($('#signupForm').valid()) {
      createTable();
    }
  });
});

/* function that creates an array based in user input */
function array(min, max) {
  let array = [];
  if (min != 0) {
    array.push(0);
  }
  for (let i = min; i <= max; i++) {
    array.push(i);
  }
  return array;
}


/* create the table by storing user input into vars. Use vars to
compute the values for the table using nested for loops.Use arrays
to iterate thought each index to genereate desired result */

let numTabs = 1;
function createTable () {
  const table = document.createElement(`table-${numTabs}`);

  var minCol = document.getElementById("mincol").value;
  var maxCol = document.getElementById("maxcol").value;
  var minRow = document.getElementById("minrow").value;
  var maxRow = document.getElementById("maxrow").value;

  const column = array(minCol, maxCol);
  const row = array(minRow, maxRow);

  for (var r = 0; r < parseInt(row.length); r++) {
    var x = document.createElement('tr');
    for (var c = 0; c < parseInt(column.length); c++) {
      var y =  document.createElement('td');
      let result = row[r] * column[c];

      if (r === 0 || c === 0) {
        result = row[r] || column[c];
        y.classList.add('header');
      }
      if (r === 0 && c === 0) result = '';
      y.innerHTML = result;
      x.appendChild(y);
    }
    table.appendChild(x);
  }

  // Adds a new tab label
  $("#tabT").append(
    `<li>
      <a href="#tab-${numTabs}">
        [${minCol}, ${maxCol}] x [${minRow}, ${maxRow}]
      </a>
      <p title="close" id="close-btn" onclick="del_oneTab(${numTabs})">x</p>
    </li>`)
  $("#tabL").append(`
    <div class="">
      <span id="tab-item-${numTabs}">
        [${minCol}, ${maxCol}] x [${minRow}, ${maxRow}]
      </span>
      <input type="checkbox" name="box" id="#table-${numTabs}">
    </div>`)

  $("#tabT").after(`<div id="tab-${numTabs}"></div>`);

  // adds table to current tab
  $(`#tab-${numTabs}`).append(table);
  // refresh
  $("#tabs").tabs("refresh");
  numTabs++;
  event.preventDefault();
}

/* function that deletes one tab at a time */
function del_oneTab(tabId) {
  let current_tab = "#tab-" + tabId;
  let current_table = "#tab-item-" + tabId;
  // Remove Panel
  $(current_tab).remove(0);
  $("#tabs").tabs("refresh");
  // Remove Tab
  let href = "a[href='" + current_tab + "']";
  $(href).closest("li").remove();
  // Remove tabL-item
  $(current_table).parent().remove();
}

/* function that deletes multiple tabs at the same time */
function deleteTabs() {
  let selected = $('input[name=box]:checked');

  for (let i = 0; i < selected.length; i++) {
    // Retrieve id of selected element
    let id = $(selected[i]).attr('id');
    // Regex to retrieve only numbers from the id string
    var reg = id.replace(/\D/g, "");
    // Calls del_oneTab to remove the tab
    del_oneTab(reg);
    // Removes parent of selected element (in this instance the list-item)
    console.log(selected[i])
    $(selected[i]).parent().remove();
  }
}

$(document).ready(function () {
  // getting all data
  function loadTable() {
    $.ajax({
      url: "php/get_all_data.php",
      type: "GET",
      dataType: "JSON",
      success: function (data) {
        $("#user_data").html("");

        if (data.status == false) {
          $("#user_data").append(
            "<tr>" + "<td colspan='4'>" + data.message + "</td>" + "</tr>"
          );
        } else {
          $.each(data, function (key, value) {
            $("#user_data").append(
              "<tr>" +
                "<td>" +
                value.id +
                "</td>" +
                "<td>" +
                value.name +
                "</td>" +
                "<td>" +
                value.age +
                "</td>" +
                "<td>" +
                value.city +
                "</td>" +
                "<td colspan='2'>" +
                "<button class='edit-btn' data-id='" +
                value.id +
                "'> edit </button>" +
                "<button class='delete-btn' data-id='" +
                value.id +
                "'> delete </button>" +
                "</td>" +
                "</tr>"
            );
          });
        }
      },
    });
  }
  loadTable();

  // status message
  function statusToast(status, message) {
    if (status == false) {
      $("#status_msg").show().text(message).addClass("error");

      setTimeout(() => {
        $("#status_msg").hide();
      }, 3000);
    } else {
      $("#status_msg").show().text(message).addClass("success");

      setTimeout(() => {
        $("#status_msg").hide();
      }, 3000);
    }
  }

  // converting form data to json
  function formdata_to_json(id) {
    var arr = $(id).serializeArray();

    var size = arr.length;

    var obj = {};

    for (let i = 0; i < size; i++) {
      obj[arr[i].name] = arr[i].value;
    }

    return JSON.stringify(obj);
  }

  //   close modal on cross
  $("#modal-close").click(function () {
    $("#overlay").hide();
    $("#modal").hide();
  });

  // showing data on modal
  $(document).on("click", ".edit-btn", function () {
    $id = $(this).data("id");

    $.ajax({
      url: "php/get_single_data.php?id=" + $id,
      method: "GET",
      dataType: "JSON",
      success: function (data) {
        if (data.status == false) {
          statusToast(data.status, data.message);
        } else {
          $("#overlay").show();
          $("#modal").show();

          $("#mname").val(data[0].name);
          $("#mage").val(data[0].age);
          $("#mcity").val(data[0].city);
          $("#mid").val(data[0].id);
        }
      },
    });
  });

  // update data
  $("#modal_form").submit(function (e) {
    e.preventDefault();

    let json_data = formdata_to_json("#modal_form");

    $.ajax({
      url: "php/update_data.php",
      method: "POST",
      data: json_data,
      dataType: "JSON",
      success: function (data) {
        $("#overlay").hide();
        $("#modal").hide();

        statusToast(data.status, data.message);

        loadTable();
      },
      error: function (xhr, status, error) {
        console.log(xhr.responseText);
      },
    });
  });

  // create data
  $("#user_form").on("submit", function (e) {
    e.preventDefault();

    let json_data = formdata_to_json("#user_form");

    $.ajax({
      url: "php/create_data.php",
      method: "POST",
      dataType: "JSON",
      data: json_data,
      success: function (data) {
        $("#user_form").trigger("reset");
        loadTable();
        statusToast(data.status, data.message);
      },
      error: function (xhr) {
        console.log(xhr.responseText);
      },
    });
  });

  // delete data
  $(document).on("click", ".delete-btn", function () {
    let uid = $(this).data("id");

    let obj = { id: uid };
    let json_obj = JSON.stringify(obj);

    let row = $(this).closest("tr");

    $.ajax({
      url: "php/delete_data.php",
      method: "POST",
      dataType: "JSON",
      data: json_obj,
      success: function (data) {
        statusToast(data.status, data.message);

        if (data.status == true) {
          row.hide();
        }
      },
      error: function (xhr) {
        console.log(xhr.responseText);
      },
    });
  });

  // search data
  $("#search").keyup(function () {
    let search_value = $("#search").val();

    console.log(search_value);
    $.ajax({
      url: "php/search_data.php?search=" + search_value,
      method: "GET",
      dataType: "JSON",
      success: function (data) {
        $("#user_data").html("");

        if (data.status == false) {
          $("#user_data").append(
            "<tr>" + "<td colspan='4'>" + data.message + "</td>" + "</tr>"
          );
        } else {
          $.each(data, function (key, value) {
            $("#user_data").append(
              "<tr>" +
                "<td>" +
                value.id +
                "</td>" +
                "<td>" +
                value.name +
                "</td>" +
                "<td>" +
                value.age +
                "</td>" +
                "<td>" +
                value.city +
                "</td>" +
                "<td colspan='2'>" +
                "<button class='edit-btn' data-id='" +
                value.id +
                "'> edit </button>" +
                "<button class='delete-btn' data-id='" +
                value.id +
                "'> delete </button>" +
                "</td>" +
                "</tr>"
            );
          });
        }
      },
      error: function (xhr) {
        console.log(xhr.responseText);
      },
    });
  });
});

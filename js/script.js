var today = new Date();

var colorExpired = null,
    colorSoonToExpire = null,
    daysToExpiry = null,
    on = 1;

var printContent = "";

$(document).ready(function() {
    //Izvlačenje podataka iz baze
    var cont = "";
    var items;
    $.ajax({
        async: false,
        type: "post",
        url: "php/getTableAll.php",
        data: "",
        dataType: "json",
        cache: false,
        success: function(result) {
            $.each(result, function(i, item) {
                items = result;
                cont +=
                    "<tr><td>" +
                    item.productName +
                    "</td><td>" +
                    item.expirationDate +
                    "</td><td>" +
                    item.Amount +
                    "</td></tr>";
            });
            $("#tbod").html(cont);
        },
    });


    //Summary at table footer
    var types = 0,
        total = 0;
    $.each(items, function(i, item) {
        types++;
        total += parseInt(item.Amount);
    });
    var sumText =
        "Total of " + total + " products of " + types + " different types.";
    $("#sum").html(sumText);
    $("#sum").css("font-size", ".5em");
    $("#sum").css("text-align", "right");

    //Kreiranje Bootstrap DataTable objekta za listu proizvoda
    $("#table").DataTable({
        columnDefs: [{
            className: "dt-center",
            targets: "_all",
        }, ],
        paging: false,
        info: false,
        order: [
            [1, "asc"]
        ],
    });

    //Učitavanje korisničkih postavki iz baze podataka
    $.ajax({
        async: false,
        type: "post",
        url: "php/getSettings.php",
        data: "",
        dataType: "json",
        cache: false,
        success: function(result) {
            colorExpired = result.colorExpired;
            colorSoonToExpire = result.colorSoonToExpire;
            daysToExpiry = result.daysToExpiry;
        },
    });

    //Klizanje kartice s notifikacijama
    $("#notifications").slideUp(1);
    $("#flip").click(function() {
        if ($("#notifications").is(":animated")) return;
        $("#notifications").slideToggle(500);
    });

    //Prikaz notifikacija
    var notifs = "";
    var res, pref;
    $.ajax({
        async: false,
        type: "post",
        url: "php/fetchPreferred.php",
        data: "",
        dataType: "json",
        cache: false,
        success: function(result) {
            pref = result;
        },
    });
    var foundany = false;
    $.each(pref, function(i, item) {
        var found = false;
        $.each(items, function(j, item2) {
            if (
                item.productName == item2.productName &&
                item.amount <= item2.Amount &&
                Date.parse(item2.expirationDate) > new Date()
            ) {
                found = true;
                return;
            }
        });
        if (!found) {
            notifs +=
                "There is less " +
                item.productName +
                " in the fridge than your preferred amount (" +
                item.amount +
                ").<br>";
            //Dodavanje u varijablu za printanje
            var am = 0;
            $.each(items, function(j, item2) {
                if (item.productName == item2.productName)
                    am = item.amount - item2.Amount;
            });
            if (am <= 0) am = item.amount;
            printContent +=
                "<tr><td>" +
                on +
                ".&nbsp;&nbsp;&nbsp;" +
                item.productName +
                ",</td><td>" +
                am +
                "</td></tr>";
            on++;

            foundany = true;
        }
    });
    $("#notifications").html(notifs);
    if (foundany) {
        $("#flip").html("There are new notifications");
        $("#flip").css("background-color", "red");
        $("#notifications").slideDown(500);
    }

    //Mijenjanje boje proizvoda
    var count = $("#table tr").length;
    for (var i = 1; i < count; i++) {
        var table = $("#table")[0];
        var cell = table.rows[i].cells[1];
        var $cell = $(cell);
        var $cellDate = new Date($cell.text());
        var $difference = Math.floor(
            (Date.UTC(
                    $cellDate.getFullYear(),
                    $cellDate.getMonth(),
                    $cellDate.getDate()
                ) -
                Date.UTC(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                )) /
            (1000 * 60 * 60 * 24)
        );
        if ($difference < 0) $(cell).css("color", colorExpired);
        else if ($difference < daysToExpiry) {
            $(cell).css("color", colorSoonToExpire);
            $(cell).text($(cell).text() + " (" + $difference + ")");
        }
    }

    //Pozicioniranje Search-a
    $(".col-sm-12:first").remove();
    $("#table_filter").css("width", "0px");

    //Print
    $("#shoppingButton").click(function() {
        if ($("#flip").text() == "There is currently no notifications.") {
            alert("Your shopping list is currently empty");
            return;
        }
        var a = window.open("", "", "height=600, width=900");
        a.document.write(
            '<html><body><h1>Shopping List</h1><table style="font-size: 1.5em;">'
        );
        a.document.write(printContent);
        a.document.write("</table></body></html>");
        a.document.close();
        a.print();
    });
});
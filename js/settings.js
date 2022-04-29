var colorExpired, colorSoonToExpire, daysToExpiry;
var fine = true;

$(document).ready(function() {
    updatePreferredTable();

    //Create datatable
    $("#table").DataTable({
        columnDefs: [{
                className: "dt-center",
                targets: "_all",
            },
            {
                width: "10%",
                targets: 2,
            },
        ],
        paging: false,
        searching: false,
        info: false,
        order: [
            [1, "asc"]
        ],
        language: {
            emptyTable: "You have no preferred items",
        },
        columnDefs: [{ orderable: false, targets: 2 }],
    });
    var tbl = $("#table").DataTable();

    //Get settings on page load
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
    $("#colorExpired").val(colorExpired);
    $("#colorSoonToExpire").val(colorSoonToExpire);
    $("#daysToExpiry").val(daysToExpiry);

    //Get table values on page load
    var selectValues = "";
    $.ajax({
        async: false,
        type: "post",
        url: "php/getTableValues.php",
        data: "",
        dataType: "json",
        cache: false,
        success: function(result) {
            $.each(result, function(i, item) {
                selectValues +=
                    '<option value="' +
                    item.productName +
                    '">' +
                    item.productName +
                    "</option>";
            });
            $("#itemSelect").html(selectValues);
        },
    });

    //Submit settings
    $("#colorExpired").change(sendExpirySettings);
    $("#colorSoonToExpire").change(sendExpirySettings);
    $("#daysToExpiry").change(sendExpirySettings);

    //Add item
    $("#addItem").click(function() {
        var itemName = $("#itemSelect").val();
        var amount = $("#amount").val();
        if ($("#amount").val() < 1) {
            alert("Entered amount is not valid.");
            return;
        } else {
            $.ajax({
                type: "post",
                url: "php/enterPreferred.php",
                data: "itemName=" + itemName + "&amount=" + amount,
            });
            updatePreferredTable();
            location.reload();
        }
    });

    //Remove item on "-" button press
    $(".removeButton").click(function() {
        var productName = this.id.substring(6, this.id.length);
        $.ajax({
            type: "post",
            url: "php/removePreferred.php",
            data: "itemName=" + productName,
            success: function() {
                updatePreferredTable();
                location.reload();
            },
        });
    });

    //Klizanje opcija Expiry Settings i Preferred Products
    $("#expirySettings").click(function() {
        if ($("#expirySettingsSlide").is(":animated")) return;
        $("#expirySettingsSlide").slideToggle(500);
    });
    $("#preferredSettings").click(function() {
        if ($("#preferredSettingsSlide").is(":animated")) return;
        $("#preferredSettingsSlide").slideToggle(500);
    })
});

//Funkcija za ažuriranje Preferred Products tablice
function updatePreferredTable() {
    var preferredItems = "";
    $.ajax({
        async: false,
        type: "post",
        url: "php/fetchPreferred.php",
        data: "",
        dataType: "json",
        cache: false,
        success: function(result) {
            $.each(result, function(i, item) {
                preferredItems +=
                    "<tr><td>" +
                    item.productName +
                    "</td><td>" +
                    item.amount +
                    "</td>" +
                    '<td><button class="removeButton" id="remove' +
                    item.productName +
                    '">-</button></td>' +
                    "</tr>";
            });
            $("#preferredBody").html(preferredItems);
        },
    });
}

//Funkcija za slanje postavka roka trajanja
function sendExpirySettings() {
    var colorExpired = $("#colorExpired").val();
    var colorSoonToExpire = $("#colorSoonToExpire").val();
    var daysToExpiry = $("#daysToExpiry").val();
    if (daysToExpiry < 1) fine = false;
    else fine = true;
    if (fine) {
        $.ajax({
            type: "post",
            url: "php/settings.php",
            data: "colorExpired=" +
                colorExpired +
                "&colorSoonToExpire=" +
                colorSoonToExpire +
                "&daysToExpiry=" +
                daysToExpiry,
        });
        $("#errorMessage").text("");
    } else $("#daysToExpiry").val(1);
}
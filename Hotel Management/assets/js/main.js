$(document).ready(function () {
    var hotel_name = ["Aravinth hotel", "Naveen hotel", "Manoj hotel", "Karthi hotel", "Aakash hotel"], hotel_match = 0;
    var i = 1, verified = 0, verified_adult = "", verified_age, verified_child, text = "", take_hotelname;
    $("#room_book").hide();
    $("#customer_details").hide();
    $("#txt_hotel").focus(function () {
        $(this).css("color", "black");
    })
    $("#btn_search").click(function () {
        if ($("#txt_hotel").val() == "") {
            $("#txt_hotel").css("border-color", "red");
        }
        else {

            $("#txt_hotel").css("border-color", "");
        }
        if ($("#checkin_date").val() == "") {
            $("#date").css("border-color", "red");
        }
        else {
            text += "check-in date:" + $("#checkin_date").val() + "<br>";
            $("#date").css("border-color", "");
        }
        if ($("#checkout_date").val() == "") {
            $("#date").css("border-color", "red");
        }
        else {
            text += "check-out date:" + $("#checkout_date").val() + "<br>";
            $("#date").css("border-color", "");
        }

        if (!($("#txt_hotel").val() == "")) {
            for (var hotel = 0; hotel < hotel_name.length; hotel++) {
                if ($("#txt_hotel").val().toLowerCase().replace(/\s+/g, '') == hotel_name[hotel].toLowerCase().replace(/\s+/g, '')) {
                    hotel_match = 1;
                    $("#hotel_error").hide();
                    take_hotelname = hotel_name[hotel];
                    break;
                }
            }
            if (hotel_match == 0) {
                $("#hotel_error").show();
                $("#hotel_error").html("Hotel not Exist..").css("color", "red");
                $("#txt_hotel").css("border-color", "red");
            }
            else {
                text += "Hotel Name:" + take_hotelname + "<br>";
                $("#txt_hotel").css("border-color", "");
            }
        }
        if ((hotel_match == 1 && $("#checkin_date").val() != "" && $("#checkout_date").val() != "")) {
            $("#room_book").show();
        }
    })
    $(document).on("click", "#btn_add", function () {
        $("#no_of_rooms").append('<div class="room"><p class="room_no">Room' + i + '</p>\
        <button class="btn_remove" name="btn_remove[]" type="button">Remove room</button>\
        <div class="adults">\
            <span>Adults</span>\
            <div class="value_adult">\
            <button type="button" class="sub_adult_mem" name="btn_sub_adult_mem[]">-</button>\
            <span class="adult_mem" name="adult_mem[]">0</span>\
            <button type="button" class="add_adult_mem" name="btn_add_adult_mem[]">+</button>\
            </div>\
            <p class="adult_no"></p>\
            </div>\
        <div class="childrens">\
            <span>Childrens</span>\
            <div class="value_child">\
            <button type="button" class="sub_child_mem" name="btn_sub_child_mem[]">-</button>\
            <span class="child_mem">0</span>\
            <button type="button" class="add_child_mem" name="btn_add_child_mem[]">+</button>\
        </div>\
        <p class="child_no"></p>\
        </div>\
        </div>\
            ');
        i++;

    });
    $(document).on("click", ".btn_remove", function () {
        $(this).closest(".room").remove();
        i--;
    })
    $(document).on("click", ".add_adult_mem", function () {
        if (Number($(this).prev(".adult_mem").html()) < 2) {
            $(this).prev(".adult_mem").html(Number($(this).prev(".adult_mem").html()) + 1);
        }
    });
    $(document).on("click", ".sub_adult_mem", function () {
        if (Number($(this).next(".adult_mem").html()) > 0) {
            $(this).next(".adult_mem").html(Number($(this).next(".adult_mem").html()) - 1);
        }
    });
    $(document).on("click", ".add_child_mem", function () {
        if (Number($(this).prev(".child_mem").html()) < 2) {
            $(this).prev(".child_mem").html(Number($(this).prev(".child_mem").html()) + 1);
            $(this).closest(".childrens").append('<div class="child">\
            <lable for="child_age" class="child_count">child '+ $(this).prev(".child_mem").html() + 'age:</lable>\
            <select class="child_age" name="child_age[]">\
                <option value="Age">Age</option>\
                <option value="1">1</option>\
                <option value="2">2</option>\
                <option value="3">3</option>\
                <option value="4">4</option>\
                <option value="5">5</option>\
                <option value="6">6</option>\
                <option value="7">7</option>\
                <option value="8">8</option>\
                <option value="9">9</option>\
                <option value="10">10</option>\
                <option value="11">11</option>\
                <option value="12">12</option>\
            </select>\
            <button class="rem_single_child">\
                <span style="color:red;font-size:11pt"> &#x2718</span>\
            </button>\
            </div>\
            <p class="age_child"></p>\
            ');
        }

    });
    $(document).on("click", ".sub_child_mem", function () {
        if (Number($(this).next(".child_mem").html()) > 0) {
            $(this).next(".child_mem").html(Number($(this).next(".child_mem").html()) - 1);
            $(this).parent().nextAll(".child").last().remove();
        }
    });
    
    $(document).on("click", ".rem_single_child", function () {
        $(this).parent().prevAll(".value_child").find(".child_mem").html(Number($(this).parent().prevAll(".value_child").find(".child_mem").html()) - 1);
        $(this).parent().next(".age_child").remove();
        $(this).parent().remove();

    });
    $("#btn_book").click(function () {
        verified_adult = "";
        verified_age = "";
        verified_child = "";
        $(".adult_mem").each(function () {
            if ($(this).html() == "0") {
                $(this).parent().next(".adult_no").show();
                $(this).parent().next(".adult_no").html("Kindly choose how many Adults").css("color", "red");
            }
            else {
                verified_adult += "1";
                $(this).parent().next(".adult_no").css("color", "");
                $(this).parent().next(".adult_no").hide();
            }
        })
        $(".child_mem").each(function () {

            if ($(this).html() == "0") {
                $(this).parent().next(".child_no").show();
                $(this).parent().next(".child_no").html("Kindly choose how many childrens").css("color", "red");
            }
            else {
                $(this).parent().next(".child_no").css("color", "");
                $(this).parent().next(".child_no").hide();
                verified_child += "1";
            }
        })
        $(".child_age").each(function () {
            if ($(this).val() == "Age") {
                $(this).parent().next(".age_child").show();
                $(this).parent().next(".age_child").html("Kindly mention age of children").css("color", "red");
            }
            else {

                $(this).parent().next(".age_child").css("color", "");
                $(this).parent().next(".age_child").hide();
                verified_age += "1";
            }
        })
        if (verified_adult == ("1".repeat($(".room").length)) && verified_child == ("1".repeat($(".room").length)) && verified_age == ("1".repeat($(".child").length))) {
            $("#search_hotel").hide();
            $("#room_book").hide();
            $("#customer_details").show();
            $(".room").each(function () {

                text += "<br>" + $(this).children(".room_no").html() + "<br>";
                text += "adult_count: " + $(this).children(".adults").find(".adult_mem").html() + "<br>";
                text += "child_count: " + $(this).children(".childrens").find(".child_mem").html() + "<br>";
                $(this).children(".childrens").children(".child").each(function () {
                    text += $(this).find(".child_count").html();
                    text += $(this).find(".child_age").val() + "</br>";
                })
                
            })
            $(".details").html(text);
        }
    })
});



$//(document).ready(function() {
    var getPopSites = $.ajax({
        'url': '/get_tables'
    });
    getPopSites.done(function(response) {
        var double_list = response.site_url;
        var double_list2 = response.icon_url;
        var siteUrls = [];
        var imgUrls = [];
        var tableString = "";
        for (i = 0; i < double_list2.length; i++) {
            siteUrls.push(double_list[i][0]);
            imgUrls.push(double_list2[i][0]);
            tableString +=
                "<tr><td align=\"center\" width=\"64\">" +
                "<img src=" + imgUrls[i] +
                "></td><td style=\"color: #FFFFFF\">" +
                siteUrls[i] + "</td><td>" +
                "Last checked 2 seconds ago" + "</td><td id=" +
                i.toString() +
                " style=\"font-size:200%\"></td><td>" +
                "Weekly Stats" + "</td></tr>";
            console.log(tableString)
        }
        document.getElementById("popular_sites").innerHTML =
            tableString;
    });


    function delete_the_string(e) {
        console.log("deleting string")
        $.post("/delete_site", {
            "the_url": e
        }).done(function delete_the_string() {
            getMySites;
            pingEverything;
        });
        //e.preventDefault();
        }    



    var getMySites = $.ajax({
        'url': '/get_other_table'
    });
    getMySites.done(function(response) {
        var url_list = response.site_url;
        var siteUrl = [];
        var j = 0;
        var nTableString = "";
        for (i = 0; i < url_list.length; i++) {
            siteUrl.push(url_list[i][0]);
            j = i + 8;
            console.log(typeof(siteUrl[i]))
            console.log("site url is " + siteUrl[i]) //
            nTableString +=
                "<tr><td align=\"center\" width=\"64\" style=\"color: #FFFFFF\">" +
                siteUrl[i] + "</td><td>" +
                "Last checked 2 seconds ago" + "</td><td id=" +
                j.toString() +
                " style=\"font-size:200%\"></td><td>" +
                "Weekly Stats" + "</td><td>" + "<button type=\"button\" onclick=\"delete_the_string(&#34;" + siteUrl[i] + "&#34;)\">Delete</button>" + 
                "</td></tr>";
            console.log(nTableString)
        }
        // "<div id=\"delete_site\">" + 
        //        "<button id=\"delete-string\">Delete</button>" + 
        document.getElementById("my_sites").innerHTML =
            nTableString;
    });
    // adds new site to the database, then runs getmysites to refresh table, but that's not working, and then ping everything
    $("#pingThisToo").click(function(e) {
        $.post("/append_my_sites", {
            "newSite": $("input[name='field']").val()
        }).done(function() {
            getMySites;
            pingEverything;
            //maybe put something to refresh the table, so you don't have to reload webpage
        });
        e.preventDefault();
    });
    var pingEverything = $.ajax({
        'url': '/get_data'
    });
    pingEverything.done(function(response) {
        console.log(response.res.length)
        for (i = 0; i < response.res.length; i++) {
            $('#' + i).text(response.res[i]);
        }
    });
    pingEverything.fail(function(jqXHR, textStatus) {
        alert('Request failed: ' + textStatus);
    });




    /*
    $("#j").click(function(e) {
        $.post("/delete_site", {
            "the_url": $("j")
        }).done(function() {
            getMySites;
            pingEverything;
        });
        e.preventDefault();
    });
    //new code here

    $("#delete-string").click(function(e) {
        $.ajax({
            type: "DELETE",
            url: "/delete_site" // think this needs to be changed, but can't find anything named generator in tut09?
        })
        .done(function(){
            $("#the-string").hide();
        });
        e.preventDefault();
    });
*/


//})
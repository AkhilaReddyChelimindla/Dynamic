$(document).ready(function () {
    var tabCount = 1;

    // Function to add a new tab
    function addTab() {
        tabCount++;
        var tabID = 'tab-' + tabCount;
        $('#tab-list').append('<li><a href="#' + tabID + '">Tab ' + tabCount + '</a><span class="close">x</span></li>');
        $('#tab-content').append('<div id="' + tabID + '" class="tab"><input type="text" class="url-input" placeholder="Enter URL"><button class="load-btn">Load</button><iframe class="iframe" src=""></iframe></div>');
        $('.tab').removeClass('active');
        $('#' + tabID).addClass('active');
    }

    // Function to remove a tab
    function removeTab() {
        tabCount--;
        var tabID = $(this).prev('a').attr('href');
        $(this).parent().remove();
        $(tabID).remove();
        $('#tab-list li:last-child').find('a').click();
    }

    // Function to load URL in iframe
    function loadURL() {
        var tabID = $(this).parent().attr('id');
        var url = $(this).prev('.url-input').val();
        $('#' + tabID + ' iframe').attr('src', url);
    }

    // Function to switch tabs using keyboard shortcuts
    $(document).keydown(function (e) {
        var activeTab = $('.tab.active');
        var activeIndex = $('.tab').index(activeTab);
        var tabList = $('#tab-list li');
        if (e.ctrlKey && e.which === 39) { // Ctrl + Right Arrow
            if (activeIndex < tabList.length - 1) {
                tabList.eq(activeIndex + 1).find('a').click();
            }
        } else if (e.ctrlKey && e.which === 37) { // Ctrl + Left Arrow
            if (activeIndex > 0) {
                tabList.eq(activeIndex - 1).find('a').click();
            }
        }
    });

    // Function to handle URL input and Enter key
    $(document).on('keydown', '.url-input', function (e) {
        if (e.which === 13) { // Enter key
            var tabID = $(this).closest('.tab').attr('id');
            var url = $(this).val();
            $('#' + tabID + ' iframe').attr('src', url);
        }
    });

    // Event listeners
    $('#add-tab-btn').click(addTab);
    $(document).on('click', '.close', removeTab);
    $(document).on('click', '.load-btn', loadURL);
    $(document).on('click', '#tab-list li a', function (e) {
        e.preventDefault();
        $('.tab').removeClass('active');
        $($(this).attr('href')).addClass('active');
        $('#tab-list li').removeClass('active');
        $(this).parent().addClass('active');
    });
});
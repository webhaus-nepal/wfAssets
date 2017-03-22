//alert('yo');

$(window).on('breakpoint-change', function(e, breakpoint) {
    console.log('breakpoint', breakpoint);
    var deviceTypeIndicator = document.getElementById("deviceTypeIndicator");

    if(breakpoint === 'bp-small') {
        document.body.innerHTML = 'CSS Breakpoint screen-small';
    }

    if(breakpoint === 'bp-medium') {
        document.body.innerHTML = 'CSS Breakpoint screen-medium';
    }

    if(breakpoint === 'bp-large') {
        document.body.innerHTML = 'CSS Breakpoint screen-large';
    }

});
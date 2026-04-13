var titleMain = $("#animatedHeading");
var titleSubs = titleMain.find("slick-active");

if (titleMain.length) {

    titleMain.slick({
        autoplay: false,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        centerPadding: "10px",
        draggable: false,
        infinite: true,
        pauseOnHover: false,
        swipe: false,
        touchMove: false,
        vertical: true,
        speed: 1000,
        autoplaySpeed: 2000,
        useTransform: true,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        adaptiveHeight: true,
    });

    $(".slick-dupe").each(function (index, el) {
        $("#animatedHeading").slick('slickAdd', "<div>" + el.innerHTML + "</div>");
    });

    titleMain.slick('slickPlay');
};

let currentStep = 1,
    previousStep = 1,
    count = 0,
    progressBar = $('.progress-div'),
    counter = $(".stepCounter"),
    additionalInfo = [],
    ignoreProgressBarArray = [".step_1", ".step_11", ".step_12", ".step_14", ".step_31"],
    totalSteps = 30;

function gotoNextStep(current_step, next_step, ignoreProgressBar="") {
    $('body,html').animate({ scrollTop: 0 }, 100); //scroll up
    $(current_step).addClass("d-none");
    $(next_step).removeClass("d-none");
    
    if(ignoreProgressBar == "") {
        count = parseInt(next_step.replace(/\.step_/g, ''));
        increaseCounter(count);
    }

    if (next_step == ".step_1") {
        progressBar.removeClass('d-none');
    }

    if (next_step == ".step_31") {
        progressBar.addClass('d-none');
    }

    if(current_step == ".step_1") {
        $(".main-header").addClass("d-none");
        $(".header-inner").removeClass("d-none");
    }else {
        $(".main-header").removeClass("d-none");
        $(".header-inner").addClass("d-none");
    }
}
function increaseCounter(count) {
    updateProgressBar(count);
    counter.text(count + `/${totalSteps}`);
}
function updateProgressBar(count) {
    let progressPercentage = (count) * (100 / totalSteps);
    $(".step-progress").css("width", progressPercentage + "%");
}

function showError(step) {
    $('.step_' + step + '_error').removeClass('d-none');
}

function hideError(step) {
    $('.step_' + step + '_error').addClass('d-none');
}

function selectAndGoToNextStep(container, currentStep, nextStep) {
    const inputId = container.getAttribute('data-input');
    const inputValue = container.getAttribute('data-value');
    
    additionalInfo.push({
        inputId: inputId,
        inputValue: inputValue
    });

    var ignoreProgressBar = '';
    if (ignoreProgressBarArray.includes(currentStep)) {
        ignoreProgressBar == true;
    }
    gotoNextStep(currentStep, nextStep, ignoreProgressBar);
}

$(".date-btn").on('click', function () {
    let day = $("select[name='day']").val();
    let month= $("select[name='month']").val();
    let year = $("select[name='year']").val();

    if (day !== "" && month !== "" && year !== "") {
        hideError(30);
        gotoNextStep('.step_30', '.step_31');
    } else {
        showError(30);
    }
});

$(".start-quiz-cta").on('click', function () {
    gotoNextStep("start_step", ".step_1");
});

$(".last-step-cta").on('click', function () {
    $("#nameForm").submit();
});
﻿function toggleMicrophone(){
    var isDisable = $("#navMicrophoneButton").hasClass('mic-disable');
    
    if (isDisable) {
        $("#navMicrophoneButton").removeClass("mic-disable");
        $("#navMicrophoneButton img").attr("src", "../img/mic.png");
    } else {
        $("#navMicrophoneButton").addClass('mic-disable');
        $("#navMicrophoneButton img").attr('src', '../img/mute.png');
    }
    
}

function toggleCamera() {
    var isDisable = $("#navCameraButton").hasClass('camera-disable');

    if (isDisable) {
        setVideo(0, 1);
        $("#navCameraButton").removeClass("camera-disable");
        $("#navCameraButton img").attr("src", "../img/camera.png");
    } else {
        setVideo(0, 0);
        $("#navCameraButton").addClass('camera-disable');
        $("#navCameraButton img").attr('src', '../img/camera-off.png');
    }
}

function leaveSession() {

}

function setAudioStatus(index)
{
    if ($("#piece-" + index + " button.mic-button").hasClass('mic-disable')) {
        $("#piece-" + index + " button.mic-button").removeClass('mic-disable');
        $("#piece-" + index + " button.mic-button").addClass('mic-enable');
        setAudio(index, 1);
    } else if ($("#piece-" + index + " button.mic-button").hasClass('mic-enable')) {
        $("#piece-" + index + " button.mic-button").removeClass('mic-enable');
        $("#piece-" + index + " button.mic-button").addClass('mic-disable');
        setAudio(index, 0);
    }
    
}

function setVideo(index, status)
{  
    if (status == 1) {
        $("#piece-" + index + " img.vid-back").remove();
        $("#piece-" + index).append("<video />");
    } else {
        $("#piece-" + index + " video").remove();
        $("#piece-" + index).append("<img src='../img/poster.png' class='vid-back'/>");
    }
}

function setAudio(index, status)
{
    if (status == 0) { //disable
        $("#piece-" + index + " img.aud-back").attr("src", "../img/mute.png");
    }
    else if (status == 1) { //enable
        $("#piece-" + index + " img.aud-back").attr("src", "../img/mic.png");
    }
    else { // 2 speaking
        $("#piece-" + index + " img.aud-back").attr("src", "../img/speaking.png");
    }
}

function toggleChat()
{
    var count = $("#layout .p-5-m-auto").length;
    if (count == 0) {

    }
}

function refreshCardViews()
{
    var gutter = 40;

    var width = $("#content").width() - gutter;
    var height = $("#content").height() - gutter;
    var count = $(".videocontainer").length;

    var w;
    var h;
    if (count == 1) {
        if (width * 9 > height * 16) {
            h = height;
            w = h * 16 / 9;
        } else {
            w = width;
            h = w * 9 / 16;
        }
    }
    else if (count == 2) {
        if (width < 320) {
            w = width;
            h = w * 9 / 16;
//            console.log("w", w, h);
        } else {
            if (width * 9 > height * 16 * 2) {
                h = height;
                w = h * 16 / 9;
            } else {
                w = width / 2;
                h = w * 9 / 16;
            }
        }        
    }
    else if (count > 2 && count < 5) {
        if (width < 320) {
            w = width;
            h = w * 9 / 16;
        }
        else {
            if (width * 9 > height * 16) {
                h = height / 2;
                w = h * 16 / 9;
            } else {
                w = width / 2;
                h = w * 9 / 16;
            }
        }
    } else if (count >= 5 && count < 7) {
        if (width < 320) {
            w = width;
            h = w * 9 / 16;
        } else if (width >= 320 && width < 1000) {
            if (width * 9 / 2 > height * 16 / 3) { // w*h= 2*3 
                h = height / 3;
                w = h * 16 / 9;
                //console.log("h", w, h);
            } else {
                w = width / 2;
                h = w * 9 / 16;
                //console.log("w", w, h);
            }
        } else {
            if (width * 9 / 3 > height * 16 / 2) { // w*h= 2*3
                h = height / 2;
                w = h * 16 / 9;
            } else {
                w = width / 3;
                h = w * 9 / 16;
            }
        }
    } else if (count >= 7 && count < 10) {
        if (width < 320) {
            w = width;
            h = w * 9 / 16;
        } else if (width >= 320 && width < 1000) {
            if (width * 9 / 2 > height * 16 / 4) { // w*h= 2*4

                h = height / 4;
                w = h * 16 / 9;
                //console.log("h", w, h);
            } else {
                w = width / 2;
                h = w * 9 / 16;
                //console.log("w", w, h);
            }
        } else {
            if (width * 9 / 3 > height * 16 / 3) { // w*h= 2*3
                h = height / 3;
                w = h * 16 / 9;
            } else {
                w = width / 3;
                h = w * 9 / 16;
            }
        }
    }

    $(".videocontainer").css("width", w).css("height", h).find(".avatar-container").css("width", h / 2).css("height", h / 2);

}

$(window).resize(function () {
    refreshCardViews();
});

$(document).ready(function () {
    refreshCardViews();

    
    /*$(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });*/
});



$("#share").click(function () { //add
    var count = $(".videocontainer").length;
    if (count == 9) return;

    var isSpeak = false; 
    var isDisableCamera = true;
    var isMute = true;
    var isModerator = false;
    var name = "H" + count;

    var activeSpeaker = '';
    if (isSpeak) {
        activeSpeaker = "active-speaker";
    }

    var avatarVisible = '';
    var cameraStatus = '';
    var videoTag = '';
    if (isDisableCamera) {
        avatarVisible = 'visible';
        cameraStatus = '<div class="indicator-container"> \
                            <div> \
                                <span class="indicator-icon-container videoMuted toolbar-icon" id=""> \
                                    <div class="jitsi-icon "> \
                                        <svg height="13" id="camera-disabled" width="13" viewBox="0 0 32 32"> \
                                            <path d="M4.375 2.688L28 26.313l-1.688 1.688-4.25-4.25c-.188.125-.5.25-.75.25h-16c-.75 0-1.313-.563-1.313-1.313V9.313c0-.75.563-1.313 1.313-1.313h1L2.687 4.375zm23.625 6v14.25L13.062 8h8.25c.75 0 1.375.563 1.375 1.313v4.688z"></path> \
                                        </svg> \
                                    </div> \
                                </span> \
                            </div> \
                        </div>';
        videoTag = '<video></video>';
    } else {
        videoTag = '<video autoplay = "" class= "" id = "remoteVideo_" playsinline = "" style = "" ></video>'; //set camera parameter;
    }

    var micStatus = '';
    var audioTag = '';
    if (isMute) {
        micStatus = '<div class="indicator-container"> \
                            <div> \
                                <span class="indicator-icon-container audioMuted toolbar-icon" id=""> \
                                    <div class="jitsi-icon "> \
                                        <svg height="13" id="mic-disabled" width="13" viewBox="0 0 32 32"> \
                                            <path d="M5.688 4l22.313 22.313-1.688 1.688-5.563-5.563c-1 .625-2.25 1-3.438 1.188v4.375h-2.625v-4.375c-4.375-.625-8-4.375-8-8.938h2.25c0 4 3.375 6.75 7.063 6.75 1.063 0 2.125-.25 3.063-.688l-2.188-2.188c-.25.063-.563.125-.875.125-2.188 0-4-1.813-4-4v-1l-8-8zM20 14.875l-8-7.938v-.25c0-2.188 1.813-4 4-4s4 1.813 4 4v8.188zm5.313-.187a8.824 8.824 0 01-1.188 4.375L22.5 17.375c.375-.813.563-1.688.563-2.688h2.25z"></path> \
                                        </svg> \
                                    </div> \
                                </span> \
                            </div> \
                        </div>';
        audioTag = '<audio></audio>';
    } else {
        audioTag = '<audio autoplay="" id="remoteAudio_"></audio>'; //set audio parameter
    }

    var moderatorStatus = '';
    if (isModerator) {
        moderatorStatus = '<div class="moderator-icon right"> \
                                <div class="indicator-container"> \
                                    <div> \
                                        <span class="indicator-icon-container focusindicator toolbar-icon" id=""> \
                                            <div class="jitsi-icon "> \
                                                <svg height="13" width="13" viewBox="0 0 32 32"> \
                                                    <path d="M16 20.563l5 3-1.313-5.688L24.125 14l-5.875-.5L16 8.125 13.75 13.5l-5.875.5 4.438 3.875L11 23.563zm13.313-8.25l-7.25 6.313 2.188 9.375-8.25-5-8.25 5 2.188-9.375-7.25-6.313 9.563-.813 3.75-8.813 3.75 8.813z"></path> \
                                                </svg> \
                                            </div> \
                                        </span> \
                                    </div> \
                                </div> \
                            </div>';
    }

    
    $("#video-panel").append('<span class="videocontainer display-video ' + activeSpeaker +'">'
            + videoTag + audioTag + 
            
            '<div class="videocontainer__toolbar"> \
                <div> '+ cameraStatus + micStatus + moderatorStatus+'</div> \
            </div> \
            <div class="videocontainer__hoverOverlay"></div> \
            <div class="displayNameContainer"><span class="displayname" id="localDisplayName">'+name+'</span></div> \
            <div class="avatar-container '+ avatarVisible +'" style="height: 105.5px; width: 105.5px;"> \
                <div class="avatar  userAvatar" style="background-color: rgba(234, 255, 128, 0.4); font-size: 180%; height: 100%; width: 100%;"> \
                    <svg class="avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> \
                        <text dominant-baseline="central" fill="rgba(255,255,255,.6)" font-size="40pt" text-anchor="middle" x="50" y="50">'+ name + '</text> \
                    </svg> \
                </div> \
            </div > \
        <span class="remotevideomenu"> \
            <div class="" id=""> \
                <span class="popover-trigger remote-video-menu-trigger"> \
                    <div class="jitsi-icon"> \
                        <svg height="1em" width="1em" viewBox="0 0 24 24"> \
                            <path d="M12 15.984c1.078 0 2.016.938 2.016 2.016s-.938 2.016-2.016 2.016S9.984 19.078 9.984 18s.938-2.016 2.016-2.016zm0-6c1.078 0 2.016.938 2.016 2.016s-.938 2.016-2.016 2.016S9.984 13.078 9.984 12 10.922 9.984 12 9.984zm0-1.968c-1.078 0-2.016-.938-2.016-2.016S10.922 3.984 12 3.984s2.016.938 2.016 2.016S13.078 8.016 12 8.016z"></path> \
                        </svg> \
                    </div> \
                </span> \
            </div> \
            <div class="popup-menu" style="position: relative; right: 168px;  top: 25px; width: 175px;"> \
                <ul aria-label="More actions menu" class="overflow-menu"> \
                    <li aria-label="Grant Moderator" class="overflow-menu-item moderator" tabindex="0" role="button"> \
                        <span class="overflow-menu-item-icon"> \
                            <div class="jitsi-icon "> \
                                <svg height="22" width="22" viewBox="0 0 24 24"> \
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 4a2 2 0 01-1.298 1.873l1.527 4.07.716 1.912c.062.074.126.074.165.035l1.444-1.444 2.032-2.032a2 2 0 111.248.579L19 19a2 2 0 01-2 2H7a2 2 0 01-2-2L4.166 8.993a2 2 0 111.248-.579l2.033 2.033L8.89 11.89c.087.042.145.016.165-.035l.716-1.912 1.527-4.07A2 2 0 1114 4zM6.84 17l-.393-4.725 1.029 1.03a2.1 2.1 0 003.451-.748L12 9.696l1.073 2.86a2.1 2.1 0 003.451.748l1.03-1.03L17.16 17H6.84z"></path> \
                                </svg> \
                            </div> \
                        </span> \
                        <span>Grant Moderator</span> \
                    </li> \
                    <li aria-label="Mute" class="overflow-menu-item mute" tabindex="0" role="button"> \
                        <span class="overflow-menu-item-icon"> \
                            <div class="jitsi-icon "> \
                                <svg fill="none" height="22" width="22" viewBox="0 0 22 22"> \
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.333 8.65V11a3.668 3.668 0 002.757 3.553.928.928 0 00-.007.114v1.757A5.501 5.501 0 015.5 11a.917.917 0 10-1.833 0c0 3.74 2.799 6.826 6.416 7.277v.973a.917.917 0 001.834 0v-.973a7.297 7.297 0 003.568-1.475l3.091 3.092a.932.932 0 101.318-1.318l-3.091-3.091.01-.013-1.311-1.311-.01.013-1.325-1.325.008-.014-1.395-1.395a1.24 1.24 0 01-.004.018l-3.61-3.609v-.023L7.334 5.993v.023l-3.909-3.91a.932.932 0 10-1.318 1.318L7.333 8.65zm1.834 1.834V11a1.833 1.833 0 002.291 1.776l-2.291-2.292zm3.682 3.683c-.29.17-.606.3-.94.386a.928.928 0 01.008.114v1.757a5.47 5.47 0 002.257-.932l-1.325-1.325zm1.818-3.476l-1.834-1.834V5.5a1.833 1.833 0 00-3.644-.287l-1.43-1.43A3.666 3.666 0 0114.667 5.5v5.19zm1.665 1.665l1.447 1.447c.357-.864.554-1.81.554-2.803a.917.917 0 10-1.833 0c0 .468-.058.922-.168 1.356z"></path> \
                                </svg> \
                            </div> \
                        </span> \
                        <span>Mute</span> \
                    </li> \
                    <li aria-label="Disable camera" class="overflow-menu-item disable-camera" tabindex="0" role="button"> \
                        <span class="overflow-menu-item-icon"> \
                            <div class="jitsi-icon"> \
                                <svg fill="none" height="22" width="22" viewBox="0 0 22 22"> \
                                    <path clip-rule="evenodd" d="M6.84 5.5h-.022L3.424 2.106a.932.932 0 10-1.318 1.318L4.182 5.5h-.515c-1.013 0-1.834.82-1.834 1.833v7.334c0 1.012.821 1.833 1.834 1.833H13.75c.404 0 .777-.13 1.08-.352l3.746 3.746a.932.932 0 101.318-1.318l-4.31-4.31v-.024L13.75 12.41v.023l-5.1-5.099h.024L6.841 5.5zm6.91 4.274V7.333h-2.44L9.475 5.5h4.274c1.012 0 1.833.82 1.833 1.833v.786l3.212-1.835a.917.917 0 011.372.796v7.84c0 .344-.19.644-.47.8l-3.736-3.735 2.372 1.356V8.659l-2.75 1.571v1.377L13.75 9.774zM3.667 7.334h2.349l7.333 7.333H3.667V7.333z"></path> \
                                </svg> \
                            </div> \
                        </span> \
                        <span>Disable camera</span> \
                    </li> \
                    <li aria-label="Toggle full screen" class="overflow-menu-item fullscreen"> \
                        <span class="overflow-menu-item-icon"> \
                            <div class="jitsi-icon "> \
                                <svg fill="none" height="22" width="22" viewBox="0 0 22 22"> \
                                    <path clip-rule="evenodd" d="M8.25 2.75H3.667a.917.917 0 00-.917.917V8.25h1.833V4.583H8.25V2.75zm5.5 1.833V2.75h4.583c.507 0 .917.41.917.917V8.25h-1.833V4.583H13.75zm0 12.834h3.667V13.75h1.833v4.583c0 .507-.41.917-.917.917H13.75v-1.833zM4.583 13.75v3.667H8.25v1.833H3.667a.917.917 0 01-.917-.917V13.75h1.833z"></path> \
                                </svg> \
                            </div> \
                        </span> \
                        <span class="overflow-menu-item-text">View full screen</span> \
                    </li> \
                </ul> \
            </div> \
        </span> \
    </span >');
    refreshCardViews();
});

$("#chat").click(function () { //remove
    var count = $(".videocontainer").length;
    if (count == 1) return;
    $('#video-panel').children().last().remove();
    refreshCardViews();
});

$("#content").hover(
    function () {
        $("#new-toolbox").addClass("visible");
        //console.log("enter");
    },
    function () {
        //console.log("leave");
        $("#new-toolbox").removeClass("visible");
        /*setTimeout(function () {
            $("#new-toolbox").removeClass("visible");
        }, 3000);*/
    }
);

$("#mic-enable").click(function () {
    var el = $(this).find(".toolbox-icon");
    el.toggleClass("toggled");
    if (el.hasClass("toggled")) {
        
        el.find("svg").attr("viewBox", "0 0 22 22");
        el.find("path").attr("d", "M7.333 8.65V11a3.668 3.668 0 002.757 3.553.928.928 0 00-.007.114v1.757A5.501 5.501 0 015.5 11a.917.917 0 10-1.833 0c0 3.74 2.799 6.826 6.416 7.277v.973a.917.917 0 001.834 0v-.973a7.297 7.297 0 003.568-1.475l3.091 3.092a.932.932 0 101.318-1.318l-3.091-3.091.01-.013-1.311-1.311-.01.013-1.325-1.325.008-.014-1.395-1.395a1.24 1.24 0 01-.004.018l-3.61-3.609v-.023L7.334 5.993v.023l-3.909-3.91a.932.932 0 10-1.318 1.318L7.333 8.65zm1.834 1.834V11a1.833 1.833 0 002.291 1.776l-2.291-2.292zm3.682 3.683c-.29.17-.606.3-.94.386a.928.928 0 01.008.114v1.757a5.47 5.47 0 002.257-.932l-1.325-1.325zm1.818-3.476l-1.834-1.834V5.5a1.833 1.833 0 00-3.644-.287l-1.43-1.43A3.666 3.666 0 0114.667 5.5v5.19zm1.665 1.665l1.447 1.447c.357-.864.554-1.81.554-2.803a.917.917 0 10-1.833 0c0 .468-.058.922-.168 1.356z");        
    } else {
        el.find("svg").attr("viewBox", "0 0 24 24");
        el.find("path").attr("d", "M16 6a4 4 0 00-8 0v6a4.002 4.002 0 003.008 3.876c-.005.04-.008.082-.008.124v1.917A6.002 6.002 0 016 12a1 1 0 10-2 0 8.001 8.001 0 007 7.938V21a1 1 0 102 0v-1.062A8.001 8.001 0 0020 12a1 1 0 10-2 0 6.002 6.002 0 01-5 5.917V16c0-.042-.003-.083-.008-.124A4.002 4.002 0 0016 12V6zm-4-2a2 2 0 00-2 2v6a2 2 0 104 0V6a2 2 0 00-2-2z");
    }
});

$("#camera-enable").click(function () {
    var el = $(this).find(".toolbox-icon");
    el.toggleClass("toggled");
    if (el.hasClass("toggled")) {
        el.find("path").attr("d", "M 6.84 5.5 h -0.022 L 3.424 2.106 a 0.932 0.932 0 1 0 -1.318 1.318 L 4.182 5.5 h -0.515 c -1.013 0 -1.834 0.82 -1.834 1.833 v 7.334 c 0 1.012 0.821 1.833 1.834 1.833 H 13.75 c 0.404 0 0.777 -0.13 1.08 -0.352 l 3.746 3.746 a 0.932 0.932 0 1 0 1.318 -1.318 l -4.31 -4.31 v -0.024 L 13.75 12.41 v 0.023 l -5.1 -5.099 h 0.024 L 6.841 5.5 Z m 6.91 4.274 V 7.333 h -2.44 L 9.475 5.5 h 4.274 c 1.012 0 1.833 0.82 1.833 1.833 v 0.786 l 3.212 -1.835 a 0.917 0.917 0 0 1 1.372 0.796 v 7.84 c 0 0.344 -0.19 0.644 -0.47 0.8 l -3.736 -3.735 l 2.372 1.356 V 8.659 l -2.75 1.571 v 1.377 L 13.75 9.774 Z M 3.667 7.334 h 2.349 l 7.333 7.333 H 3.667 V 7.333 Z");
    } else {
        el.find("path").attr("d", "M13.75 5.5H3.667c-1.013 0-1.834.82-1.834 1.833v7.334c0 1.012.821 1.833 1.834 1.833H13.75c1.012 0 1.833-.82 1.833-1.833v-.786l3.212 1.835a.916.916 0 001.372-.796V7.08a.917.917 0 00-1.372-.796l-3.212 1.835v-.786c0-1.012-.82-1.833-1.833-1.833zm0 3.667v5.5H3.667V7.333H13.75v1.834zm4.583 4.174l-2.75-1.572v-1.538l2.75-1.572v4.682z");
    }
});

$("#share").click(function () {
    var el = $(this).find(".toolbox-icon");
    el.toggleClass("toggled");
    if (el.hasClass("toggled")) {

    } else {

    }
});

$("#chat").click(function () {
    var el = $(this).find(".toolbox-icon");
    el.toggleClass("toggled");
    if (el.hasClass("toggled")) {

    } else {

    }
});

$("#leave").click(function () {
    var el = $(this).find(".toolbox-icon");
    el.toggleClass("toggled");
    if (el.hasClass("toggled")) {

    } else {

    }
});

$("#video-panel")
    .on('click', '.remotevideomenu', 
        function () {
            //console.log("visible");
            $(this).find(".popup-menu").toggleClass("visible");
        }
    )
    .on('click', '.moderator',
        function () {
            console.log("moderator");
        }
    )
    .on('click', '.mute',
        function () {
            console.log("mute");
        }
    )
    .on('click', '.disable-camera',
        function () {
            console.log("disable-camera");
        }
    )
    .on('click', '.fullscreen',
        function () {
            console.log("fullscreen");
        }
    )
    .on('mouseover', '.videocontainer', function () {
        $(this).removeClass("display-video");
        $(this).addClass("display-name-on-video");
    })
    .on('mouseout', '.videocontainer', function () {
        $(this).removeClass("display-name-on-video");
        $(this).addClass("display-video");
    })
/*
$(".videocontainer").hover(
    function () {
        //console.log("videocontainer hover");
        $(this).removeClass("display-video");
        $(this).addClass("display-name-on-video");
    },
    function () {
        $(this).removeClass("display-name-on-video");
        $(this).addClass("display-video");
    }
);*/
/*
$("#video-panel").on('click' , '.moderator',
    function () {
        console.log("moderator");
    }
);*/




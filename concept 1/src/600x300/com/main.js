//IIFE TO EXTRACT DIMENSION DATA
var dimensions = (function(){
        var str = document.querySelectorAll("[name='ad.size']")[0].getAttributeNode("content").value;
        var widthMatch = /width\=(\d+)/.exec(str);
        var heightMatch = /height\=(\d+)/.exec(str);
        return {
            width: parseInt(widthMatch[1]),
            height: parseInt(heightMatch[1])
        }
})();

var tl;
var stopWatch;

//INITIALIZE
function init(){

    // Helper function for FOUC
    let domReady = (cb) => {
        document.readyState === 'interactive' || document.readyState === 'complete'
        ? cb()
        : document.addEventListener('DOMContentLoaded', cb);
    };
    
    domReady(() => {
        // Display body when DOM is loaded
        document.body.style.visibility = 'visible';
    });

    IDsToVars();

    container.style.width = dimensions.width + 'px';
    container.style.height = dimensions.height + 'px';
    
    //set timeline
    tl = new TimelineLite();

    addListeners();
    
    animate();
}

function addListeners(){
    //replay functionality
    /*
    replay_button.addEventListener('mouseover',function(){
        TweenLite.fromTo(replay_button, .5, {rotation:'-360'}, {overwrite:false, rotation:'0'});
    })
    replay_button.addEventListener('click',function(){
            tl.restart();
    })
    */
}

//ANIMATE
function animate(){
    stopWatch=new Date().getTime(); 
    const ells = [ellipse1,ellipse2,ellipse3]
    //timeline animation here
    tl = new TimelineLite();
    tl    
    .set(ells, {scale:.001,opacity:0})

    // F1 ELLIPSE ANIM:
    // ellipse grow
    .to(ellipse1, .5, {scale:1,opacity:1, ease:Expo.easeOut},"ell_grow")
    .to(ellipse3, .5, {scale:1,opacity:1, ease:Expo.easeOut},"ell_grow+=.1")
    .to(ellipse2, .5, {scale:1,opacity:1, ease:Expo.easeOut},"ell_grow+=.2")

    // connect ellipse
    .to(ellipse1, 0.5, {x:9, y:15, scale:.8, ease:Expo.easeIn},"conn-=.2")
    .to(ellipse2, 0.5, {x:-10, y:1, scale:.95, ease:Expo.easeIn},"conn-=.2")
    .to(ellipse3, 0.5, {x:6, y:-12, scale:.65, ease:Expo.easeIn},"conn-=.2")
    // ellipse disappears and standiong logo appears
    .to(ells, 0.1, {opacity:0,ease:Power4.easeOut})
    .from(ell_endAnim_2x, .1, {opacity:0,ease:Expo.easeOut},"-=.1")
    // logo copy slides in logo_c_2x
    .from(logo_c_2x, 0.4, {x:-6, opacity:0,ease:Power2.easeIn},"-=.2")


    // copy animations
    .from(bg_2x, .7, {x:40, opacity:0,ease:Power1.easeIn},"bg")
    .staggerFrom([c_2x,c1_2x], .7, {x:-60,opacity:0,ease:Power4.easeIn},.3,"bg")
    .to([c_2x,c1_2x], .5, {opacity:0},"+=1.8")

    // F2
    .from(c2_2x, .7, {x:-70,opacity:0,ease:Power4.easeIn})
    .to([c2_2x], .5, {opacity:0},"+=1.7")

    // EF
    .staggerFrom([c3_2x,c4_2x,c5_2x], .7, {x:-60,opacity:0,ease:Power4.easeIn},.3)
    .from([cta_2x,legal_2x], .4, {opacity:0,ease:Power1.easeIn})
    
    //.call(returnTimer)
}

function returnTimer(){
    stopWatch=((new Date().getTime())-stopWatch)*.001;
    console.log(stopWatch+" seconds");
}

function clickThrough(){
    window.open(clicktag);
}

//SET IDs IN DOM TO GLOBAL VARIABLES
function IDsToVars(){
    var allElements = document.getElementsByTagName("*");
    
    for (var q = 0; q<allElements.length; q++){
         var el = allElements[q];
         if (el.id){
            window[el.id]=document.getElementById(el.id);
        }
    }
};
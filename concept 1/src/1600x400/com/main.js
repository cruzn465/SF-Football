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
    .to(ellipse1, 0.5, {x:10, y:13, scale:.9, ease:Expo.easeIn},"conn-=.2")
    .to(ellipse2, 0.5, {x:-9, y:0, scale:1, ease:Expo.easeIn},"conn-=.2")
    .to(ellipse3, 0.5, {x:5, y:-13, scale:.6,height:19, width:27,ease:Expo.easeIn},"conn-=.2")
    // ellipse disappears and standiong logo appears
    .to(ells, 0.1, {opacity:0,ease:Power4.easeOut},)
    .from(ell_endAnim_2x, .2, {opacity:0,ease:Power4.easeOut},"-=.1")
    // logo copy slides in logo_c_2x
    .from(logo_c_2x, 0.6, {x:-10, opacity:0,ease:Expo.easeIn},"-=.4")


    // copy animations
    .from(bg_2x, 1, {x:50, opacity:0,ease:Expo.easeIn},"bg-=.3")
    .from(c_2x, 1, {x:-50, opacity:0,ease:Expo.easeIn},"bg+=.1")
    .to([c_2x], .8, {opacity:0,ease:Power2.easeIn},"+=1.3")

    // F2
    .from(c2_2x, 1, {x:-45, opacity:0,ease:Expo.easeIn})
    .to([c2_2x], .8, {opacity:0,ease:Expo.easeIn},"+=1.7")

    // EF
    .from(c4_2x, 1, {x:-45, opacity:0,ease:Expo.easeIn})
    .from(cta_2x, .5, {opacity:0,ease:Power1.easeIn},"+=.1")

    
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
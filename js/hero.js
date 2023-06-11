const props = [
    {
        img: "../media/spider.png",
        title: "Spider-Man",
        more: "Spider-Man is a superhero appearing in American comic books published by Marvel Comics. "
    },
    {
        img: "../media/logan.png",
        title: "Logan",
        more: "Logan comes out of retirement to escort a young mutant named Laura to a safe place"
    },
    {
        img: "media/hulk.png",
        title: "Incredible Hulk",
        more: "Dr Bruce Banner subjects himself to high levels of gamma radiation which triggers his transformation into a huge green creature"
    }
    ,{
        img: "../media/captain.png",
        title: "Captain America",
        more: "During World War II, Steve Rogers decides to volunteer in an experiment that transforms his weak body."
    },
    
]





const heroImg = document.getElementById("navbar_hero")
const watchlist_con = document.getElementById("watchlist_con")
const watchlist_btn = document.querySelectorAll(".watchlist")
const close_btn = document.querySelector('.watch_close')
const right_btn = document.querySelector('.right')
const left_btn = document.querySelector('.left')
const controls = document.querySelector('.controls')
const nums = controls.querySelectorAll(".num")
const title = document.querySelector(".title")
const more = document.querySelector(".more")
const btnSpan = document.querySelector(".btn_span")
const burger = document.querySelector(".burger")
const dropdown = document.querySelector(".dropdown")
const fadeIn  = document.querySelectorAll(".mid_hero .first_ani")
const span1 = document.querySelector(".span_1")
const span2 = document.querySelector(".span_2")
const span3 = document.querySelector(".span_3")
const socials = document.querySelector(".socials_span")
const list_item = document.querySelectorAll(".drop_nav_content .list_item")
// const movies_con  = document.querySelector(".movies_span_con")



document.addEventListener("DOMContentLoaded", _=> {
    // tlm.play()
    let value = props[0];
    heroImg.style.backgroundImage = `url(${value.img})`
    title.innerText = value.title
    more.innerText = value.more

})
let curr_index = 0
right_btn.addEventListener("click", _ => {
    rightClick()
})
left_btn.addEventListener("click", _=> {
    leftClick()
})

function leftClick () {
    curr_index--
    if(curr_index < 0) {
        curr_index = props.length-1
    }
    setValues(curr_index)
}

function rightClick() {
    curr_index ++
    if(curr_index == props.length) {
        curr_index = 0
    }
    setValues(curr_index)
}

nums.forEach(num => {
    num.addEventListener("click", (e)=> {
        let current = e.currentTarget.id
        setValues(current)
        curr_index = current
    })
})


function setValues(curr_index) {
    let value = props[curr_index]
    heroImg.style.backgroundImage = `url(${value.img})`
    title.innerText = value.title
    more.innerText = value.more
    nums.forEach(num => {
        num.classList.remove("active")
    } )
    nums[curr_index].classList.add("active")
}
const tlm = gsap.timeline({})
const tlm1 = gsap.timeline({})
const tlm2 = gsap.timeline({paused:true,reversed:true})
const tlm3 = gsap.timeline({paused:true,reversed:true})

gsap.registerPlugin(ScrollTrigger)

gsap.to(".trail_1_con", {
    transform: "scale(100%,100%)",
    duration: 5,
    ease: "power3.in",
    id:"firrrr",
    scrollTrigger:  {
        trigger: ".trail_1_con",
        start: "0% 80%",
        end: "center center",
        scrub: 4,
        toggleAction: "restart none none none",
    }
})

gsap.to(".other_trail_con", {
    transform: "scale(100%,100%)",
    duration: 4,
    ease: "power3.in",
    id:"2ndddd",
    scrollTrigger:  {
        trigger: ".other_trail_con",
        start: "top 90%",
        end: "center center",
        scrub: 2,
        toggleAction: "restart none none none",
    }
})
tlm1.to(".arti", {
    transform: "scale(100%,100%)",
    duration: 3,
    ease: "power3.in",
    id:"3rdddd",   
    scrollTrigger:  {
        trigger: ".arti",
        start: "top 80%",
        end: "center center",
        scrub: 2,
        toggleAction: "restart none none none",
    }
})
tlm.to(".person", {
    transform: "rotateY(0deg)",
    duration: 3,
    ease: "power3.in", 
    scrollTrigger:  {
        trigger: ".person",
        start: "top 80%",
        end: "center center",
        scrub: 2,
        toggleAction: "restart none none none",
    }
})

gsap.to(".con2", {
    transform: "translateX(0)",
    duration: 3,
    ease: "power3.in",
    scrollTrigger:  {
    trigger: ".con2",
    start: "top 80%",
    end: "center 65%",
    scrub: 3,
    toggleAction: "restart none none none",
    }
})
gsap.to(".con1", {
    transform: "translateX(0)",
    duration: 3,
    ease: "power3.in",
    scrollTrigger:  {
    trigger: ".con1",
    start: "top 80%",
    end: "center 65%",
    scrub: 3,
    toggleAction: "restart none none none",

    }
})



tlm1.to(title,{
    'margin-bottom': 0, 
    opacity: 1, 
    duration: 0.8, 
    ease: "power2.out"
})
.to(more,{
    'margin-bottom': 0, 
    opacity: 1, 
    duration: 1, 
    ease: "power3.out"
},"+=1.2")
.to(btnSpan,{
    'margin-bottom': 0, 
    opacity: 1, 
    duration: 1, 
    ease: "power2.out"
},"same")
.to(controls,{
    x: 0, 
    duration: 1.6, 
    ease: "bounce.out"
},"same")
.to(socials,{
    opacity: 1, 
    duration: 1.6, 
    ease: "power2.out"
})


tlm2.to(span2,{
    scaleX:0, 
    transformOrigin:"50% 50%", 
    duration: 0.4, 
    ease: "power2.inOut"
})
    .to(span1,{
        y:12, 
        duration: 0.45,
        ease: "power2.inOut"
    },"slide")
    .to(span3,{
        y:-12, 
        duration: 0.45,
        ease: "power2.inOut"
    },"slide")
    .to(span1,{
        rotation:45, 
        duration: 0.45,
        ease: "power2.inOut"
    },"cross")
    .to(span3,{
        rotation:-45, 
        duration: 0.45,
        ease: "power2.inOut"
    },"cross")
    .to(dropdown,{
        borderBottomRightRadius:"50%", 
        duration: 0.8,
        ease: "power3.inOut"
    },"-=1")
    .to(dropdown,{
        height:"100vh",
        width:"100vw",
        borderBottomRightRadius:"0%",
        opacity:1, 
        duration: 1,
        ease: "power3.inOut"
    },"-=1")
    
tlm3.to(list_item,{
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
    duration: 0.25,
    ease: "power2.inOut",
    stagger:.4
},"+1.3")
    

    burger.addEventListener("click",_=> {
        tlm2.reversed()?tlm2.play():tlm2.reverse()
        tlm3.reversed()?tlm3.play():tlm3.reverse()
    })


watchlist_btn.forEach(btn => {
    btn.addEventListener("click", _=> {
        watchlist_con.classList.add("open")
    })
})
close_btn.addEventListener("click", _=> {
    watchlist_con.classList.remove("open")
})

// Adapted from Codrops / ScrollBasedLayoutAnimations (MIT).
// https://github.com/codrops/ScrollBasedLayoutAnimations
import gsap from 'gsap';
import {Flip} from 'gsap/Flip';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(Flip,ScrollTrigger);
export function setupGallery(){
 const mm=gsap.matchMedia();
 mm.add('(min-width: 800px) and (prefers-reduced-motion: no-preference)',()=>{
  const gallery=document.querySelector('.gallery');
  const items=gallery.querySelectorAll('.gallery-item');
  gallery.classList.add('gallery-switch');
  const state=Flip.getState(items);
  gallery.classList.remove('gallery-switch');
  const animation=Flip.to(state,{ease:'none',absolute:false,scale:true,simple:true,stagger:.025,scrollTrigger:{trigger:gallery,start:'center center',end:'+=130%',pin:gallery.parentNode,scrub:true,invalidateOnRefresh:true}});
  return ()=>animation.kill();
 });
 return mm;
}

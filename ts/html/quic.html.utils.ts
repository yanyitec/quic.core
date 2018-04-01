///<reference path="../core/quic.render.ts" />

namespace Quic{
    createElement = (context:IRenderContext,type?:string):any=>{
        return document.createElement(type||"div");
    }
    appendElement=(context:IRenderContext,parentElement:any,element:any):void=>{
        parentElement.appendChild(element);
    }

    export namespace Html{
        export function attach(element:HTMLElement,evt:string,listener:EventListenerOrEventListenerObject){
            if(element.addEventListener){
                (Quic as any).attach = function(element:HTMLElement,evt:string,listener:EventListenerOrEventListenerObject){
                    element.addEventListener(evt,listener,false);
                }
            }else if((element as any).attachEvent){
                (Quic as any).attach = function(element:HTMLElement,evt:string,listener:EventListenerOrEventListenerObject){
                    (element as any).attachEvent("on" + evt,listener,false);
                }
            }else {
                throw new Error("Browser is not support the addEventListener/attachEvent");
            }
            (Quic as any).attach(element,evt,listener);
        }
    }
    
}
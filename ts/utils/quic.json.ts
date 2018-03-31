namespace Quic{
    export class ParseJsonException extends Error{
        text:string;
        at:number;
        line:number;
        offset:number;
        constructor(message:string,raw:string,at:number,line:number,offset:number){
            super(message);
            this.text = raw;
            this.at = at;
            this.line = line;
            this.offset = offset;
        }
    }
    class Parser{
        stack:Array<any>;
        line:number;
        at:number;
        offset:number;
        text:string;
        current:any;
        lastAt:number;
        _inString:string;
        _key:string;
        constructor(text:string){
            this.text = text;
            this.lastAt = 0;
            this.at = 0;
            this.offset = 1;
            this.line = 1;
            this.stack = [];
            this._key = null;
        }
        doubleQuote(at:number){
            if(!this._inString){
                this._inString ='"';
                return;
            }
            if(this._inString==='"'){
                let txt = this.text.substring(this.lastAt,at-1);
                if(this.current.push) this.current.push(txt);
                else if(this._key===null) this._key = txt;
                else {
                    this.current[this._key] = txt;
                    this._key = null;
                }
                return true;
            }
        }
        singleQuote(at:number){
            this.at = at;
            if(!this._inString){
                this._inString ="'";
                return;
            }
            if(this._inString==="'"){
                let txt = this.text.substring(this.lastAt,at-1);
                if(this.current.push) this.current.push(txt);
                else if(this._key===null) this._key = txt;
                else {
                    this.current[this._key] = txt;
                    this._key = null;
                }
                return true;
            }
        }
        colon(at:number){
            if(this._inString) return;
            if(this._key!==null) throw new ParseJsonException("重复的(:)",this.text,this.at,this.line,this.offset);
            this._key = this.text.substring(this.lastAt,at-1);
            return true;
            
        }
        comma(at:number){
            if(this._inString) return;
            //}后面的,
            let lastChar = this.text[this.lastAt-1];
            if(lastChar==="}" || lastChar ==="]") return;
            if(!this.current){
                let txt = this.text.substring(this.lastAt,at-1);
                if(this._key===null){
                    this.current = [txt];
                    this.stack.push(this.current);
                }else {
                    this.current = {};
                    this.current[this._key] = txt;
                    this._key = null;
                }
                this.stack.push(this.current);
                return;
            }
                
            if(this.current.push || this._key===null){
                let txt = this.text.substring(this.lastAt,at-1);
                this.current.push(txt);
                return;
            }
            let txt = this.text.substring(this.lastAt,at-1);
            this.current[this._key] = txt;
            this._key = null;
            return true;
        }
        braceBegin(at:number){
            if(this._inString) return;
            let curr = {};
            if(!this.current){
                let txt = this.text.substring(this.lastAt,at-1);
                
                if(this._key===null){
                    if(this.stack.length==0){
                        this.current={};
                        this.stack.push(this.current);
                    }else {
                        throw new ParseJsonException("未能解析出key，就出现({)",this.text,this.at,this.line,this.offset);
                    }
                }else{
                    throw new ParseJsonException("未定义的解析路径",this.text,this.at,this.line,this.offset);
                }
               
            }else {
                if(this.current.push){
                    this.current.push(curr);
                    this.stack.push(curr);
                    this.current = curr;
                }else {
                    if(this._key===null) {
                        throw new ParseJsonException("未定义的解析路径",this.text,this.at,this.line,this.offset);
                    }
                    this.current[this._key] = curr;
                    this.current = curr;
                    this._key = null;
                }
            }
                
            return true;

        }
        braceEnd(at:number){
            if(this._inString) return;
            if(!this.current)throw new ParseJsonException("不期望出现的(})",this.text,this.at,this.line,this.offset);
            if(!(this.current = this.stack.pop()))throw new ParseJsonException("多余的(})",this.text,this.at,this.line,this.offset);
            return true;
        }
        bracketBegin(at:number){
            if(this._inString) return;
            let curr= [];
            if(!this.current){
                if(this.stack.length==0){
                    this.current = curr;
                    this.stack.push(curr);
                    return true;
                }else{
                    throw new ParseJsonException("未定义的解析路径",this.text,this.at,this.line,this.offset);
                }
            }else {
                if(this._key===null){
                    if(this.current.push){
                        this.current.push(curr);
                        this.current = curr;
                        this.stack.push(curr);
                        return true;
                    }else {
                        throw new ParseJsonException("key还未解析出来，就要到了([)",this.text,this.at,this.line,this.offset);
                    }
                }else {
                    this.current[this._key] = curr;
                    this.current = curr;
                    this.stack.push(curr);
                    this._key = null;
                    return true;
                }
            }
        }
        bracketEnd(at:number){
            
        }

    }
    export function parseJson(text:string){
        let stack=[];
        let currentObj;
        let line:number = 1,offset = 1;
        let isInString :string,isInArray :boolean;
        let lastTokenAt :number=0;
        
        let key:string=null,value:string;
        for(let at = 0,j=text.length;at<j;at++){
            
        }
    }
}
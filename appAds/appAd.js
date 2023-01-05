class disableBackBtn{
	/*
	USAGE

	var back=new disableBackBtn();	//MAKE THE OBJECT...to make object always use 'back' as reference

	// TO DISABLE
	back.disable();
	// TO DISABLE FOR 3 TIMES BACK PRESS
	back.disable(3);

	// TO ENABLE
	back.disable();

	:::remember only one can be used in one time and one object formatino.
	*/
	static nchange=0;
	disable(n){
		if(n){
			for(var i=1; i<n; i++){location.hash+="dis_"+n;disableBackBtn.nchange++;}
		}else{
			location.hash+=this.preHash="dis_"+disableBackBtn.nchange;
			disableBackBtn.nchange++;
			setTimeout(()=>{
				window.addEventListener("hashchange",back.repeatHash);
			},200)
		}
	}
	repeatHash(){
		if(!location.hash.includes(this.preHash)){
			console.log(disableBackBtn.nchange)
			location.hash+=this.preHash="dis_"+disableBackBtn.nchange;
		}
	}
	pressAgainToExit(fn){
		if(fn){
			location.hash+=this.pressedAgainHash="dis_"+1;

			setTimeout(()=>{
				window.addEventListener("hashchange",()=>{
					if(!location.hash.includes(this.pressedAgainHash)){
						fn();
					}
				});	
			},200)
		}
	}
	enable(){
		window.removeEventListener("hashchange",back.repeatHash);
		history.go(-disableBackBtn.nchange);
	}
}

var back=new disableBackBtn();

class appAd{
	static allApps=[
	  /*[name,img link after domoain,skiptime,refLnk,plateform]
	  plateform = amazon || play etc.

	  */
		[
			'Roz Dhan - Earn Wallet Cash',
			"videos/Roz Dhan - Earn Wallet Cash.png",
			9,
			"https://taplnk.cc/iVV5N",
			"play"
		],
	];
	dataForApp={
		amazon: ['#f7a200','Check Now','#222'],
		play: ['#00a173','Install',"#fff"],
	}

	static domain="https://aimodules.netlify.app/appAds/";

	loadTime=5000
	constructor(adNum){
		this.makeReady(adNum);
	}
	makeReady(adNum){
		if(!adNum){adNum=Math.floor(appAd.allApps.length*Math.random())}
		this.ad={
			name: appAd.allApps[adNum][0],
			img: appAd.allApps[adNum][1]!=''?appAd.domain+appAd.allApps[adNum][1] : '',
			vid: appAd.domain+"videos/"+appAd.allApps[adNum][0]+".mp4",
			skipTime:appAd.allApps[adNum][2],
			refLnk:appAd.allApps[adNum][3],
			plateform: appAd.allApps[adNum][4],
		};
		console.log(this.ad);
		appAd.loadFilePre("video",this.ad.vid);//_________add full path for video
		appAd.loadFilePre("img",this.ad.img);
		console.log(appAd.domain+'imgs/'+this.ad.plateform+'.png');
		appAd.loadFilePre("img",appAd.domain+'imgs/'+this.ad.plateform+'.png');
	}
	showAd(){
		this.makeUi();
		this.videoBox=document.querySelector("#appAdVid");
		this.videoBox.play().then(()=>{
			this.startCounter();
		});
		this.videoBox.onended=this.closeAd;
		back.disable();
	}

	closeAd(){
		console.log('came to close');
		var videoBox=document.querySelector("#appAdVid");
		if(videoBox){
			videoBox.remove();
			document.querySelector("#AdBigPlay").remove();
			var adsk=document.querySelector("#adSkipper");
			adsk.style.right="10px";
			adsk.style.left="";
		}else{
			document.querySelector(".addPanBg").remove();
			back.enable();
		}
	}

	startCounter(){
		var skip=document.querySelector("#adSkipper"),
		st=this.ad.skipTime,
		sx=setInterval(()=>{
			st--;
			skip.innerHTML=st;
			if(st==0){
				skip.innerHTML="Skip Ad";
				skip.onclick=this.closeAd;
				clearInterval(sx)
			}
		},1000);
	}

	static loadFilePre(typ,src){
		var id=("preload"+Math.random()).replace(".",'');
		document.body.insertAdjacentHTML("afterbegin",`<${typ} preload src="${src}" id="${id}" style="display: none;"></${typ}>`);
		setTimeout(()=>{
			document.querySelector("#"+id).remove();
		},this.loadTime);

		//LOAD FONT
		document.head.insertAdjacentHTML("beforeend",`
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@600&display=swap" rel="stylesheet"> `);
		//
	}


	makeUi(){
		var pfuidata=this.dataForApp[this.ad.plateform];
		console.log(pfuidata);
		var html=`
<style>
.flex{display: flex;align-items: center;justify-content: center;}.c{flex-flow: column;}.w100p{width: 100%}
.addPanBg{
	font-family: 'Noto Sans', sans-serif;
}
.addPanBg video{
	width: 100%;
	aspect-ratio: 16/9;
}
</style>
<div class="addPanBg flex c" style="position: fixed; width: 100%; height: 100vh; background: #fff;top: 0;left: 0;">
	<div class="appAdMain flex c" style="justify-content: flex-start; max-width: 500px; width: 100vw; height: 100vh;">
		<div class="top w100p flex" style="margin: 30px 0; padding: 10px; align-items: stretch; justify-content: flex-start;">
			${this.ad.img!=''?`<img src="${this.ad.img}" class="logo" width="100px" height="100px" style="border-radius: 10px; margin-right: 20px;"  alt='rozdhan icon'>`:""}
			<div class="right flex c" style="justify-content: space-between; align-items: flex-start;">
				<p style="font-size: 1.8em;">${this.ad.name}</p>
				<img src="${appAd.domain}/imgs/${this.ad.plateform}.png" alt="${this.ad.plateform} icon" style="height: 25px;">
			</div>
		</div>
		<video id="appAdVid"src="${this.ad.vid}" class="middle"></video>
		<div class="bottom flex c"  style="margin: 30px 0; padding: 10px;">
			<img id="AdBigPlay" src="${appAd.domain}/imgs/${this.ad.plateform}.png"  alt='${this.ad.plateform} icon' style="margin: 10px 0">
			<button onclick="window.open('${this.ad.refLnk}')" style="padding: 10px 55px; background: ${pfuidata[0]}; color: ${pfuidata[2]}; border-radius: 2px; border: none; font-size: 1.2em;" >${pfuidata[1]}</button>
			${this.ad.plateform=='amazon'? "<p style='text-align: center;margin-top: 7px;'>&amp;<br>Buy Later</p>":''}
		</div>
	</div>
	<div id="adSkipper" style="position: absolute;left: 10px;top: 10px;padding: 5px 10px;border-radius: 99px;box-shadow: 0 0 2px #0007;color: #0009;font-family: monospace;">${this.ad.skipTime}</div>
</div>
		`

		document.body.insertAdjacentHTML("beforeend",html);
	}


}



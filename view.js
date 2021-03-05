export const View = {

    commentary: (viewUrl)=> {
        return `
  <object id="flashObj" width="250" height="200" classid="clsid:11111" codebase="http://download.me">
    <param name="movie" value="http://c.brightcove.com/services/viewer/federated_f9?isVid=1" />
    <param name="bgcolor" value="#FFFFFF" />
    <param name="flashVars" value="playerID=11111&playerKey=0000&domain=embed&dynamicStreaming=true" />
    <param name="base" value="http://admin.brightcove.com" />
    <param name="seamlesstabbing" value="false" />
    <param name="allowFullScreen" value="true" />
    <param name="swLiveConnect" value="true" />
    <param name="allowScriptAccess" value="always" /> 
    <embed src="${viewUrl}"
        bgcolor="#FFFFFF" 
        flashVars="playerID=11111&playerKey=AQ~~,11111~,11111-11111&domain=embed&dynamicStreaming=true" 
        base="http://admin.brightcove.com" 
        name="flashObj" width="250" h
        eight="200" seamlesstabbing="false" 
        type="application/x-shockwave-flash" 
        allowFullScreen="true" 
        swLiveConnect="true" 
        allowScriptAccess="always" 
        pluginspage="http://www.macromedia.com/shockwave/oldschool-i-know/download/index.cgi">
    </embed>
  </object>
   <br> 
   <img src="/images/share.png" width="60" height="18" class="shareButton" onclick="fbCallQuote()"/>`
    },

    icon: (key, kind, time) => {
       return `<img onclick='milyoni.seek(${time});' 
                                        id='icon_${key}' 
                                        class='icon_bar ${kind}' 
                                        src='/images/${kind}_icon.png' >`  
    },

    liker: (urlForPix, link)=> {
        return `<b>${object.name}</b><br/><img src="${urlForPix}"> <iframe src="https://www.facebook.com/plugins/like.php?href=${link}&amp;send=false&amp;layout=standard&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=45" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:35px;" allowTransparency="true"></iframe>`
    },
    
    aQuote: (text)=>{
       return `"${text}" <img src="/images/share.png" width="60" height="18" class="shareButton" onclick="fbCallQuote();"/>`
    },
    
    clip:(urlForThumbnail)=>{
        return `<img src="${urlForThumbnail}" width="158" height="85" class="clipImage" />
 <img src="/images/share.png" width="60" height="18" class="shareButton" onclick="fbCallClip();" />`
    }
}



function GCSoundManager()
{
    if (GCSoundManager.prototype._SingletonInstance)
    {
        return GCSoundManager.prototype._SingletonInstance;
    }
    GCSoundManager.prototype._SingletonInstance = this;
    
	var data = document.createElement("div");
	data.id = "SoundManager";
	var sounds = document.createElement("div");
	
	document.body.appendChild(sounds);
	var soundVolumes = new Array();
	var globalVolume = 1;
	
	this.Load = function(name,url)
	{
		var sound = new Audio(url);
		sound.id = name;
		sound.loop = false;
		sound.controls = false;
		sound.autoplay = false;
		data.appendChild(sound);
		//console.log(data.children[data.children.length-1]);
	}
	
	this.UnLoad = function(name)
	{
		for( x=0; x<data.children.length; x++ )
		{
			if( data.children[x].id==name )
			{
				data.removeChild(data.children[x]);
				break;
			}
		}
		var count=0;
		for( x=0; x<sounds.children.length; x++ )
		{
			if( sounds.children[x].id==name )
			{
				count++;
			}
		}
		for( x=0; x<count; x++)
		{
			for( y=0; y<sounds.children.length; y++ )
			{
				if( sounds.children[y].id==name )
				{
					sounds.removeChild(sounds.children[y]);
					break;
				}
			}
		}
	}
	
	this.Play = function(name,volume,loop)
	{
		for( x=0; x<data.children.length; x++ )
		{
			if( data.children[x].id==name )
			{
				//預設音量 = 1;
				volume = THREE.Math.clamp( volume||1,0,1 );
				var sound = new Audio(data.children[x].src);
				sound.id = name;
				sound.loop = loop || false;
				sound.controls = true;
				sound.autoplay = true;
				sound.volume = volume*globalVolume;
				sound.addEventListener("ended",
				function(){
					for( x=0; x<sounds.children.length; x++ )
					{
						if( sounds.children[x]==this )
						{
							soundVolumes.splice(x,1);
							break;
						}
					}
					sounds.removeChild(this);
				},false);
				sounds.appendChild(sound);
				soundVolumes.push(volume);
				return sound;
				break;
			}
		}
	}
	
	this.Remove = function(sound)
	{
		for( x=0; x<sounds.children.length; x++ )
		{
			if( sounds.children[x]==sound )
			{
				sounds.removeChild(sound);
				break;
			}
		}
	}
	
	this.SetGlobalVolume = function(volume)
	{
		volume = THREE.Math.clamp( volume,0,1 );
		globalVolume = volume;
		for( x=0; x<sounds.children.length; x++ )
		{
			sounds.children[x].volume = soundVolumes[x]*globalVolume;
		}
	}
	
	this.GetGlobalVolume = function()
	{
		return globalVolume;
	}
	
	//測試用
	this.Data = function()
	{
		var text = "globalVolume:"+globalVolume+"\t DataLength:"+data.childElementCount+"\t SoundsLength:"+sounds.childElementCount;
		return text;
	}	

}
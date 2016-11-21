{"anim":[{"src":"Data/Animation/bomb.xml","type":"plist"},{"src":"Data/Animation/bomb.plist","type":"plist"},{"src":"Data/Animation/bombF.xml","type":"plist"},{"src":"Data/Animation/bombF.plist","type":"plist"}],"res":[{"src":"Data/Animation/bomb.png","type":"image"},{"src":"Data/Animation/bombF.png","type":"image"},{"src":"Data/Textures/controller/alpha.png","type":"image"},{"src":"Data/Textures/controller/up_click.png","type":"image"},{"src":"Data/Textures/controller/alphaVec.png","type":"image"},{"src":"Data/Textures/controller/right_click.png","type":"image"},{"src":"Data/Textures/controller/down_click.png","type":"image"},{"src":"Data/Textures/controller/left_click.png","type":"image"},{"src":"Data/Textures/direction.png","type":"image"},{"src":"Data/Textures/bomb.png","type":"image"},{"src":"Data/Textures/bomb_click.png","type":"image"},{"src":"Data/Textures/prop_BG.png","type":"image"},{"src":"Data/Textures/prop01.png","type":"image"},{"src":"Data/Textures/prop02.png","type":"image"},{"src":"Data/Textures/prop03.png","type":"image"},{"src":"Data/Textures/prop04.png","type":"image"},{"src":"Data/Textures/prop05.png","type":"image"},{"src":"Data/Textures/prop06.png","type":"image"},{"src":"Data/Textures/prop07.png","type":"image"},{"src":"Data/Textures/prop08.png","type":"image"},{"src":"Data/Textures/heart.png","type":"image"},{"src":"Data/Textures/chat.png","type":"image"},{"src":"Data/Textures/text01.png","type":"image"},{"src":"Data/Textures/text02.png","type":"image"},{"src":"Data/Textures/text04.png","type":"image"},{"src":"Data/Textures/text03.png","type":"image"},{"src":"Data/Textures/text05.png","type":"image"},{"src":"Data/Textures/background.png","type":"image"}],"sound":[],"obj":[{"enable":1,"parent":null,"name":"character01","component":[{"scaleY":1.96692025661469,"scaleX":1.96692085266113,"posX":501.856903076172,"posY":103.129241943359,"posZ":-2,"src":"Data/Animation/bomb.png","rotate":0.0,"type":"Sprite"},{"type":"Script","src":"Data/Script/GameCharaDisplay.js"},{"type":"Animation","src":"Data/Animation/bomb.xml","plist":"Data/Animation/bomb.plist"}]},{"enable":1,"parent":null,"name":"character02","component":[{"scaleY":1.96692097187042,"scaleX":1.96692097187042,"posX":501.856842041016,"posY":104.112579345703,"posZ":-2,"src":"Data/Animation/bombF.png","rotate":0.0,"type":"Sprite"},{"type":"Script","src":"Data/Script/GameCharaDisplay.js"},{"type":"Animation","src":"Data/Animation/bombF.xml","plist":"Data/Animation/bombF.plist"}]},{"enable":1,"parent":null,"name":"up_btn","component":[{"scaleY":1.48625004291534,"scaleX":1.0,"posX":191.569519042969,"posY":319.051879882813,"posZ":-2,"normalImage":"Data/Textures/controller/alpha.png","selectImage":"Data/Textures/controller/up_click.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameDire_btn.js"}]},{"enable":1,"parent":null,"name":"right_btn","component":[{"scaleY":1.0,"scaleX":1.56249976158142,"posX":310.594085693359,"posY":203.350799560547,"posZ":-2,"normalImage":"Data/Textures/controller/alphaVec.png","selectImage":"Data/Textures/controller/right_click.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameDire_btn.js"}]},{"enable":1,"parent":null,"name":"down_btn","component":[{"scaleY":1.48625004291534,"scaleX":1.0,"posX":193.887329101563,"posY":102.111099243164,"posZ":-2,"normalImage":"Data/Textures/controller/alpha.png","selectImage":"Data/Textures/controller/down_click.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameDire_btn.js"}]},{"enable":1,"parent":null,"name":"left_btn","component":[{"scaleY":1.0,"scaleX":1.5625,"posX":90.3238754272461,"posY":200.854278564453,"posZ":-2,"normalImage":"Data/Textures/controller/alphaVec.png","selectImage":"Data/Textures/controller/left_click.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameDire_btn.js"}]},{"enable":1,"parent":null,"name":"direction","component":[{"scaleY":1.0,"scaleX":1.0,"posX":115.493629455566,"posY":127.245712280273,"posZ":-1,"src":"Data/Textures/direction.png","rotate":0.0,"type":"Sprite"},{"type":"Script","src":"Data/Script/GameMgr.js"}]},{"enable":1,"parent":null,"name":"Bomb_btn","component":[{"scaleY":1.0,"scaleX":1.0,"posX":889.358825683594,"posY":170.579666137695,"posZ":-2,"normalImage":"Data/Textures/bomb.png","selectImage":"Data/Textures/bomb_click.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameBomb_btn.js"}]},{"enable":1,"parent":null,"name":"prop_BG","component":[{"scaleY":1.00885701179504,"scaleX":1.00885701179504,"posX":59.7299575805664,"posY":569.675231933594,"posZ":-1,"src":"Data/Textures/prop_BG.png","rotate":0.0,"type":"Sprite"}]},{"enable":1,"parent":null,"name":"prop01","component":[{"scaleY":1.0,"scaleX":1.0,"posX":186.499969482422,"posY":619.596740722656,"posZ":-2,"normalImage":"Data/Textures/prop01.png","selectImage":"Data/Textures/prop01.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameItem_btn.js"}]},{"enable":1,"parent":null,"name":"prop02","component":[{"scaleY":1.0,"scaleX":1.0,"posX":294.500030517578,"posY":619.5966796875,"posZ":-2,"normalImage":"Data/Textures/prop02.png","selectImage":"Data/Textures/prop02.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameItem_btn.js"}]},{"enable":1,"parent":null,"name":"prop03","component":[{"scaleY":1.0,"scaleX":1.0,"posX":402.5,"posY":619.5966796875,"posZ":-2,"normalImage":"Data/Textures/prop03.png","selectImage":"Data/Textures/prop03.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameItem_btn.js"}]},{"enable":1,"parent":null,"name":"prop04","component":[{"scaleY":1.0,"scaleX":1.0,"posX":510.5,"posY":619.5966796875,"posZ":-2,"normalImage":"Data/Textures/prop04.png","selectImage":"Data/Textures/prop04.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameItem_btn.js"}]},{"enable":1,"parent":null,"name":"prop05","component":[{"scaleY":1.0,"scaleX":1.0,"posX":618.5,"posY":619.5966796875,"posZ":-2,"normalImage":"Data/Textures/prop05.png","selectImage":"Data/Textures/prop05.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameItem_btn.js"}]},{"enable":1,"parent":null,"name":"prop06","component":[{"scaleY":1.0,"scaleX":1.0,"posX":726.500122070313,"posY":619.5966796875,"posZ":-2,"normalImage":"Data/Textures/prop06.png","selectImage":"Data/Textures/prop06.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameItem_btn.js"}]},{"enable":1,"parent":null,"name":"prop07","component":[{"scaleY":1.0,"scaleX":1.0,"posX":834.5,"posY":619.5966796875,"posZ":-2,"normalImage":"Data/Textures/prop07.png","selectImage":"Data/Textures/prop07.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameItem_btn.js"}]},{"enable":1,"parent":null,"name":"prop08","component":[{"scaleY":1.0,"scaleX":1.0,"posX":942.5,"posY":619.5966796875,"posZ":-2,"normalImage":"Data/Textures/prop08.png","selectImage":"Data/Textures/prop08.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameItem_btn.js"}]},{"enable":1,"parent":null,"name":"prop01_txt","component":[{"scaleY":1.0,"scaleX":1.0,"posX":275.200012207031,"posY":637.918029785156,"posZ":-3,"text":"0","fontSize":24,"r":0.0,"g":0.0,"b":0.0,"a":255.0,"rotate":0.0,"type":"Label"}]},{"enable":1,"parent":null,"name":"prop02_txt","component":[{"scaleY":1.0,"scaleX":1.0,"posX":384.0,"posY":637.917846679688,"posZ":-4,"text":"0","fontSize":24,"r":0.0,"g":0.0,"b":0.0,"a":255.0,"rotate":0.0,"type":"Label"}]},{"enable":1,"parent":null,"name":"prop03_txt","component":[{"scaleY":1.0,"scaleX":1.0,"posX":491.52001953125,"posY":637.917846679688,"posZ":-3,"text":"0","fontSize":24,"r":0.0,"g":0.0,"b":0.0,"a":255.0,"rotate":0.0,"type":"Label"}]},{"enable":1,"parent":null,"name":"prop04_txt","component":[{"scaleY":1.0,"scaleX":1.0,"posX":600.320007324219,"posY":637.917846679688,"posZ":-3,"text":"0","fontSize":24,"r":0.0,"g":0.0,"b":0.0,"a":255.0,"rotate":0.0,"type":"Label"}]},{"enable":1,"parent":null,"name":"prop05_txt","component":[{"scaleY":1.0,"scaleX":1.0,"posX":707.839965820313,"posY":637.917846679688,"posZ":-3,"text":"0","fontSize":24,"r":0.0,"g":0.0,"b":0.0,"a":255.0,"rotate":0.0,"type":"Label"}]},{"enable":1,"parent":null,"name":"prop06_txt","component":[{"scaleY":1.0,"scaleX":1.0,"posX":815.360046386719,"posY":637.917846679688,"posZ":-3,"text":"0","fontSize":24,"r":0.0,"g":0.0,"b":0.0,"a":255.0,"rotate":0.0,"type":"Label"}]},{"enable":1,"parent":null,"name":"prop07_txt","component":[{"scaleY":1.0,"scaleX":1.0,"posX":922.879943847656,"posY":637.917846679688,"posZ":-3,"text":"0","fontSize":24,"r":0.0,"g":0.0,"b":0.0,"a":255.0,"rotate":0.0,"type":"Label"}]},{"enable":1,"parent":null,"name":"prop08_txt","component":[{"scaleY":1.0,"scaleX":1.0,"posX":1031.67993164063,"posY":637.917846679688,"posZ":-3,"text":"0","fontSize":24,"r":0.0,"g":0.0,"b":0.0,"a":255.0,"rotate":0.0,"type":"Label"}]},{"enable":1,"parent":null,"name":"heart1","component":[{"scaleY":1.0,"scaleX":1.0,"posX":110.916915893555,"posY":507.020721435547,"posZ":0,"src":"Data/Textures/heart.png","rotate":0.0,"type":"Sprite"}]},{"enable":1,"parent":null,"name":"heart2","component":[{"scaleY":1.0,"scaleX":1.0,"posX":206.404449462891,"posY":507.020721435547,"posZ":0,"src":"Data/Textures/heart.png","rotate":0.0,"type":"Sprite"}]},{"enable":1,"parent":null,"name":"heart3","component":[{"scaleY":1.0,"scaleX":1.0,"posX":304.145874023438,"posY":507.584197998047,"posZ":0,"src":"Data/Textures/heart.png","rotate":0.0,"type":"Sprite"}]},{"enable":1,"parent":null,"name":"msg01","component":[{"scaleY":1.89999997615814,"scaleX":1.89999997615814,"posX":387.77490234375,"posY":7.87671804428101,"posZ":0,"normalImage":"Data/Textures/chat.png","selectImage":"Data/Textures/chat.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameMsgBtn.js"}]},{"enable":1,"parent":null,"name":"text01","component":[{"scaleY":1.0,"scaleX":1.0,"posX":446.394073486328,"posY":30.1159801483154,"posZ":-2,"src":"Data/Textures/text01.png","rotate":0.0,"type":"Sprite"}]},{"enable":1,"parent":null,"name":"text02","component":[{"scaleY":1.0,"scaleX":1.0,"posX":555.703247070313,"posY":25.5636157989502,"posZ":-2,"src":"Data/Textures/text02.png","rotate":0.0,"type":"Sprite"}]},{"enable":1,"parent":null,"name":"msg02","component":[{"scaleY":1.89999997615814,"scaleX":1.89999997615814,"posX":498.010314941406,"posY":6.2951922416687,"posZ":0,"normalImage":"Data/Textures/chat.png","selectImage":"Data/Textures/chat.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameMsgBtn.js"}]},{"enable":1,"parent":null,"name":"msg04","component":[{"scaleY":1.89999997615814,"scaleX":1.89999997615814,"posX":720.749755859375,"posY":6.29522228240967,"posZ":0,"normalImage":"Data/Textures/chat.png","selectImage":"Data/Textures/chat.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameMsgBtn.js"}]},{"enable":1,"parent":null,"name":"text04","component":[{"scaleY":1.0,"scaleX":1.0,"posX":781.127746582031,"posY":28.2637596130371,"posZ":-2,"src":"Data/Textures/text04.png","rotate":0.0,"type":"Sprite"}]},{"enable":1,"parent":null,"name":"text03","component":[{"scaleY":1.0,"scaleX":1.0,"posX":669.757629394531,"posY":28.2637596130371,"posZ":-2,"src":"Data/Textures/text03.png","rotate":0.0,"type":"Sprite"}]},{"enable":1,"parent":null,"name":"msg03","component":[{"scaleY":1.89999997615814,"scaleX":1.89999997615814,"posX":609.3798828125,"posY":6.29522228240967,"posZ":0,"normalImage":"Data/Textures/chat.png","selectImage":"Data/Textures/chat.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameMsgBtn.js"}]},{"enable":1,"parent":null,"name":"msg05","component":[{"scaleY":1.89999997615814,"scaleX":1.89999997615814,"posX":836.486450195313,"posY":6.29521608352661,"posZ":0,"normalImage":"Data/Textures/chat.png","selectImage":"Data/Textures/chat.png","rotate":0.0,"type":"Button"},{"type":"Script","src":"Data/Script/GameMsgBtn.js"}]},{"enable":1,"parent":null,"name":"text05","component":[{"scaleY":1.0,"scaleX":1.0,"posX":896.86376953125,"posY":28.2637367248535,"posZ":-2,"src":"Data/Textures/text05.png","rotate":0.0,"type":"Sprite"}]},{"enable":1,"parent":null,"name":"background","component":[{"scaleY":1.0,"scaleX":1.0,"posX":-5.54566383361816,"posY":0.313520431518555,"posZ":1,"src":"Data/Textures/background.png","rotate":0.0,"type":"Sprite"}]},{"enable":1,"parent":null,"name":"background","component":[{"scaleY":1.0,"scaleX":1.10000014305115,"posX":1312.83227539063,"posY":713.763122558594,"posZ":1,"src":"Data/Textures/background.png","rotate":179.999847412109,"type":"Sprite"}]}],"js":[{"src":"Data/Script/GameCharaDisplay.js","type":"script"},{"src":"Data/Script/GameDire_btn.js","type":"script"},{"src":"Data/Script/GameMgr.js","type":"script"},{"src":"Data/Script/GameBomb_btn.js","type":"script"},{"src":"Data/Script/GameItem_btn.js","type":"script"},{"src":"Data/Script/GameMsgBtn.js","type":"script"}]}


//---------------------------------------------------------------------------------------------
//  GameMgr : GCScriptComponent
//---------------------------------------------------------------------------------------------
function GameMgr()
{
    GCScriptComponent.call(this);
	
	this.pState = [];
	this.pState[1] = {};
	this.pState[2] = {};
	this.pState[1].move = false;
	this.pState[1].moving = false;
	this.pState[1].dire = '';
	this.pState[2].move = false;
	this.pState[2].moving = false;
	this.pState[2].dire = '';
	
	this.playerMovePos = [];
	this.playerMovePos[1] = {};
	this.playerMovePos[2] = {};	
	
	this.pBomb = [];
	this.pBomb[1] = {};
	this.pBomb[2] = {};
	this.pBomb[1].put = false;
	this.pBomb[1].bombPos = [];
	this.pBomb[2].put = false;
	this.pBomb[2].bombPos = [];
	
	this.pSkill = [];
	this.pSkill[1] = [];
	this.pSkill[2] = [];
	for (var i = 1; i < 9; i++) {
		this.pSkill[1][i] = 0;
		this.pSkill[2][i] = 0;
	}
	
	this.fireTimer = 0;
	
	this.pMsg = [];
	this.pMsg[1] = {};
	this.pMsg[2] = {};
	this.pMsg[1].msg = 0;
	this.pMsg[2].msg = 0;
	this.pMsg[1].time = 0;
	this.pMsg[2].time = 0;
};

//---------------------------------------------------------------------------------------------
GameMgr.prototype = Object.create(GCScriptComponent.prototype);
GameMgr.prototype.constructor = GameMgr;

//-----------------------------------------------------------------------------
GameMgr.prototype.Awake = function()
{
	for (var i = 0; i < 10; i++) {
		this.pBomb[1].bombPos[i] = [];
		this.pBomb[2].bombPos[i] = [];
		for (var y = 0; y < 10; y++) {			
			this.pBomb[1].bombPos[i][y] = -1;
			this.pBomb[2].bombPos[i][y] = -1;
		}
	}
	
	playerHp[1] = 3;
	playerHp[2] = 3;
};

//---------------------------------------------------------------------------------------------
GameMgr.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
GameMgr.prototype.Start = function()
{
	nowSCMgr = this;
	
	for(var i = 1; i < 6; i++) {
		for(var y = 1; y < 3; y++){
			this.getObjectByName('p' + y + '_txt_0' + i).root.setVisible(false);
		}
	}
};

//-----------------------------------------------------------------------------
GameMgr.prototype.Update = function(deltaTime)
{
	for(var i = 1; i < 3; i++){
		if (this.pMsg[i].time > 0 && this.pMsg[i].time != 999)
			this.pMsg[i].time -= 0.01;
	
		if (this.pMsg[i].msg != 0) {
			for(var y = 1; y < 6; y++) {
					this.getObjectByName('p' + i + '_txt_0' + y).root.setVisible(false);
			}
		
			this.getObjectByName('p' + i + '_txt_0' + this.pMsg[i].msg).root.setVisible(true);
			this.pMsg[i].msg = 0;
		}
		if (this.pMsg[i].time <= 0 && this.pMsg[i].time != 999) {
			for(var y = 1; y < 6; y++) {
				this.getObjectByName('p' + i + '_txt_0' + y).root.setVisible(false);
			}
			this.pMsg[i].time = 999;
		}
	
		for(var y = 2; y < 9; y++) {
			if (this.pSkill[i][y] > 0)
				this.pSkill[i][y] -= 0.01;
		}
	
		if (this.pSkill[i][1] > 0 && playerHp[i] < 3) {
			this.pSkill[i][1] = 0;
			playerHp[i]++;
			
			var req = {};
			req.target = i == 1 ? player1 : player2;
			req.type = 'damage';
			req.heartCount = playerHp[i];
			bomClient.send(JSON.stringify(req));
		}
	}

	this.fireTimer += 0.01;
	
	if (this.fireTimer > 0.1) {
		var fireCube = {};
		
		while (true) {
			fireCube = this.getObjectByName('fire-Clone');
			if (fireCube == undefined)
				break;
			
			fireCube.name = 'fire-trash';
			
			fireCube.SetPosition(1300, 800);
			fireCube.root.setVisible(false);
		}
		
		this.fireTimer = 0;
	}
	
	for(var i = 1; i < 3; i++) {
		var pBomb = this.pBomb[i];
		if (pBomb.put) {
			var hasBomb = false;
			for(var bi = 0; bi < 10; bi++) {
				for(var by = 0; by < 10; by++) {
					if (pBomb.bombPos[bi][by] != -1) {
						hasBomb = true;
					}
				}
			}
			
			if (!hasBomb || this.pSkill[i][8] > 0){
				var pPos = GetPlayerPos(i);
				if (nowSCState[pPos.x][pPos.y] == 0) {
					// can put the bomb.
					nowSCState[pPos.x][pPos.y] = 5;
					
					var bomb = this.getObjectByName('bomb-trash');

					if (bomb == undefined)
						bomb = this.getObjectByName('bomb').clone();
					
					bomb.name = 'cube_' + pPos.x + '-' + pPos.y;
					
					bomb.SetPosition(GetRealPosition(pPos.x, pPos.y, 5));
					
					pBomb.bombPos[pPos.x][pPos.y] = 8;				
				}
				
				pBomb.put = false;
			}
			else 
				pBomb.put = false;
		}
	
		var pState = this.pState[i];
		if (pState.move && !pState.moving) {
			
			console.log(i + ' move');
			pState.moving = true;
			
			var pPos = GetPlayerPos(i);
			console.log(pPos);
			var newPos = {x: pPos.x, y: pPos.y};
			
			if (pState.dire == 'up') {
				newPos.y++;
			}
			if (pState.dire == 'down') {
				newPos.y--;
			}
			if (pState.dire == 'right') {
				newPos.x++;
			}
			if (pState.dire == 'left') {
				newPos.x--;
			}
			
			if (newPos.x < 0)
				newPos.x = 0;
			if (newPos.x > 9)
				newPos.x = 9;
			if (newPos.y < 0)
				newPos.y = 0;
			if (newPos.y > 9)
				newPos.y = 9;
			
			console.log(newPos);
			
			if (nowSCState[newPos.x][newPos.y] == 0 || (nowSCState[newPos.x][newPos.y] != 15 && (this.pSkill[i][6] > 0 || (nowSCState[pPos.x][pPos.y] != 0 && nowSCState[pPos.x][pPos.y] != 5)))) {
				console.log('canMove');
				// can move
				/*
				nowSCState[pPos.x][pPos.y] = 0;
				nowSCState[newPos.x][newPos.y] = i;
				*/
				
				playerPos[i] = newPos;
				
				this.playerMovePos[i] = GetRealPosition(newPos.x, newPos.y, i);
			}
			else if (nowSCState[newPos.x][newPos.y] > 20) {
					
				playerPos[i] = newPos;
				
				this.playerMovePos[i] = GetRealPosition(newPos.x, newPos.y, i);
								
			}
			
			//debug
			//pState.moving = false;
		}		
		
		this.PlayerMove(1, deltaTime);
		this.PlayerMove(2, deltaTime);
		this.Bomb(deltaTime);
	}
};

GameMgr.prototype.Bomb = function(deltaTime) {
	for (var i = 0; i < 10; i++) {
		for (var y = 0; y < 10; y++) {			
			for (var yy = 1; yy < 3; yy++) {
				if (this.pBomb[yy].bombPos[i][y] > 0) {
					this.pBomb[yy].bombPos[i][y] -= deltaTime;				
				
					if (this.pBomb[yy].bombPos[i][y] <= 0) {
						//bomb
						this.fireTimer = 0;
						
						var bomb = this.getObjectByName('cube_' + i + '-' + y);
						
						bomb.name = 'bomb-trash';
						
						bomb.SetPosition(1300, 800);
						
						this.pBomb[yy].bombPos[i][y] = -1;
						
						nowSCState[i][y] = 0;
						
						
						// bomb handle
						var bombPower = 5 + (this.pSkill[yy][3] > 0 ? 5 : 0);
						
						this.FireHandle(i, y)
						var fireCube = this.getObjectByName('fire-trash');
						if (fireCube == undefined)
							fireCube = this.getObjectByName('fire').clone();
						var realPos = GetRealPosition(i, y);
						fireCube.name = 'fire-Clone';
						fireCube.root.setVisible(true);
						fireCube.SetPosition(realPos.x, realPos.y);
						
						
						for (var z = 1; z < bombPower; z++) {
							if (i + z <= 9 && nowSCState[i + z][y] != 5){
								if(nowSCState[i + z][y] == 15)
									break;
									
								if (this.FireHandle(i + z, y))
									continue;
									
								break;
							}
						}
						
						for (var z = 1; z < bombPower; z++) {
							if (i - z >= 0 && nowSCState[i - z][y] != 5){
								if(nowSCState[i - z][y] == 15)
									break;
									
								if (this.FireHandle(i - z, y))
									continue;
								break;
							}
						}
						
						for (var z = 1; z < bombPower; z++) {
							if (y + z <= 9 && nowSCState[i][y + z] != 5){
								if(nowSCState[i][y + z] == 15)
									break;
										
								if (this.FireHandle(i, y + z))
									continue;						
								break;
							}
						}
						
						for (var z = 1; z < bombPower; z++) {
							if (y - z >= 0 && nowSCState[i][y - z] != 5){
								if(nowSCState[i][y - z] == 15)
									break;
									
								if (this.FireHandle(i, y - z))
									continue;											
								break;
							}
						}
					}
				}
			}
		}
	}
}

GameMgr.prototype.FireHandle = function(fX, fY) {							
	if (GetPlayerPos(1).x == fX && GetPlayerPos(1).y == fY) {
		playerHp[1]--;
		
		if (playerHp[1] <= 0) {
			var req = {};
			req.target = 'all';
			req.type = 'gameOver';
			req.winner = player2;
			bomClient.send(JSON.stringify(req));
		}
		
		var req = {};
		req.target = player1;
		req.type = 'damage';
		req.heartCount = playerHp[1];
		bomClient.send(JSON.stringify(req));
	}
	if (GetPlayerPos(2).x == fX&& GetPlayerPos(2).y == fY) {
		playerHp[2]--;
		
		if (playerHp[2] <= 0) {
			var req = {};
			req.target = 'all';
			req.type = 'gameOver';
			req.winner = player1;
			bomClient.send(JSON.stringify(req));
		}
		
		var req = {};
		req.target = player2;
		req.type = 'damage';
		req.heartCount = playerHp[2];
		bomClient.send(JSON.stringify(req));
	}
			
	var fireCube = this.getObjectByName('fire-trash');
	if (fireCube == undefined)
		fireCube = this.getObjectByName('fire').clone();
	var realPos = GetRealPosition(fX, fY);
	fireCube.name = 'fire-Clone';
	fireCube.root.setVisible(true);
	fireCube.SetPosition(realPos.x, realPos.y);
	
	// delete cube
	if (nowSCState[fX][fY] == 0)
		return true;
		
	nowSCState[fX][fY] = 0;
	
	var cube = this.getObjectByName('cube_' + fX + '-' + (fY));
	cube.name = 'trash';
	cube.root.setVisible(false);
	cube.SetPosition(1300, 800);
	
	if (Math.floor(Math.random() * 101) < 20) {
		var itemType = Math.floor(Math.random() * 8) + 1;
		if (itemType == 2 || itemType == 4 || itemType == 5) {
			itemType = 1;
		}
			
		nowSCState[fX][fY] = itemType + 20;
		
		var itemCube = this.getObjectByName('prop0' + itemType).clone();
		
		itemCube.SetPosition(realPos.x, realPos.y);
		itemCube.name = 'cube_' + fX + '-' + fY;
	}
	
	return false;
}

GameMgr.prototype.PlayerMove = function(player, deltaTime) {			
	
	if (this.pState[player].moving) {
		var playerCube = this.getObjectByName('character0' + player);
		var speed = 100 + (this.pSkill[player][7] > 0 ? 150 : 0);
		var movement = speed * deltaTime;		
		
		var playerNowPos = playerCube.GetPosition(); 
		
		var movementVec2 = {x: 0, y: 0};
		
		var xOffset = this.playerMovePos[player].x - playerNowPos.x;
		var yOffset = this.playerMovePos[player].y - playerNowPos.y;
		
		var xNeed = true;
		var yNeed = true;
		
		if (xOffset > 0 && movement < xOffset)
			movementVec2.x = movement;			
		else if (xOffset < 0 && -movement > xOffset)
			movementVec2.x = -movement;
		else
			xNeed = false;
			
		if (yOffset > 0 && movement < yOffset)
			movementVec2.y = movement;			
		else if (yOffset < 0 && -movement > yOffset)
			movementVec2.y = -movement;
		else 
			yNeed = false;
		
		/*		
		console.log(xNeed);
		console.log(yNeed);
		console.log(movementVec2);
		*/
					
		if (xNeed || yNeed)
			playerCube.Translate(movementVec2.x, movementVec2.y); 
		else {
			playerCube.SetPosition(this.playerMovePos[player].x, this.playerMovePos[player].y);
			this.pState[player].moving = false;
			this.pState[player].move = false;
			
			var itemPos = playerPos[player];
			console.log(itemPos.x);
			console.log(itemPos.y);
			if (nowSCState[itemPos.x][itemPos.y] > 20){
			
				var itemCube = this.getObjectByName('cube_' + itemPos.x + '-' + itemPos.y);
				itemCube.name = 'trash';
				itemCube.root.setVisible(false);
				itemCube.SetPosition(1300, 800);
				
				var req = {};
				
				req.target = player == 1 ? player1 : player2;
				req.type = 'addItem';
				req.itemType = nowSCState[itemPos.x][itemPos.y] - 20;
				playerItem[player][req.itemType]++;
				req.itemCount = playerItem[player][req.itemType];
				
				bomClient.send(JSON.stringify(req));			

				nowSCState[itemPos.x][itemPos.y] = 0;				
			}
		}
	}
	
	/*
	playerCube.SetPosition(GetRealPosition(pos.x, pos.y, player));
	console.log(playerCube);
	console.log(GetRealPosition(pos.x, pos.y, player));
	*/
	
}

//---------------------------------------------------------------------------------------------

var script = new GameMgr();
var type = script.ClassName();
GCScriptManager().addScript(type, script);

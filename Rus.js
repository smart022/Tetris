var Canvas=document.getElementById('canvas');
var ctx=Canvas.getContext("2d");

var H_num_Block=15;// horizontal 
var V_num_Block=25;// vertical
var Block_height=20;
var Block_width=20;

var Speed = 150;

var block = null;
var Status = 1;

//紫色 #EE1289
ctx.fillStyle='#EE1289'
//ctx.fillRect(10,10,20,20);

function Start(){
	block = new Block();
	Status = 1;
	ctx.clearRect(0,0,H_num_Block*Block_width,V_num_Block*Block_height);
	block.G_NewBlock();
	block.New2Current();

	Timer();
}

function End(){
	Status = 0;
}

function Timer(){

	var Nnum = block.CurrentBlock.dimension;

	if(block.Down_Possible(1))
	{
		ClearBlock();
		block.ptIndex.Y++;
	}
	else
	{
		for (var i = 0; i < Nnum*Nnum; i++) {
		
		if(block.CurrentBlock.ptrArr[i]==1)
			{
				var Final_X = block.ptIndex.X + i%Nnum;
				var Final_Y = block.ptIndex.Y + Math.floor(i/Nnum);
				block.State[Final_Y][Final_X]=1;
			}
		}

		if(GameOver())
		{

		}
		else
		{
			block.New2Current();
			block.G_NewBlock();
		}
	}
	
	Disappear();
	DrawBlock();
	if(Status == 1)
		setTimeout('Timer()',Speed);
}

function GameOver(){
	return false;
}

function DrawBlock(){
	//ctx.clearRect(0,0,4*Block_width,4*Block_height);
	
	Nnum=block.CurrentBlock.dimension;
	
	// draw the Current Block
	for (var i = 0; i < Nnum*Nnum; i++) {
		//console.log(block.example.ptrArr[i]);
		if(block.CurrentBlock.ptrArr[i]==1)
		{
			var Final_X = block.ptIndex.X + i%Nnum;
			var Final_Y = block.ptIndex.Y + Math.floor(i/Nnum);
			ctx.fillRect(Final_X*Block_width,Final_Y*Block_height,Block_width,Block_height);
		}
	}

	// draw the falled Blocks
	for (var j=0;j<V_num_Block;j++)//25
	{
		for (var i=0;i<H_num_Block;i++){//15
				if (block.State[j][i]==1)
				{
					ctx.fillRect(i*Block_width,j*Block_height,Block_width,Block_height);
				}
			}
	}

}

function ClearBlock(){
	Nnum = block.CurrentBlock.dimension;
		for (var i = 0; i < Nnum*Nnum; i++) {
		//console.log(block.example.ptrArr[i]);
		if(block.CurrentBlock.ptrArr[i]==1)
		{
			var Final_X = block.ptIndex.X + i%Nnum;
			var Final_Y = block.ptIndex.Y + Math.floor(i/Nnum);
			ctx.clearRect(Final_X*Block_width,Final_Y*Block_height,Block_width,Block_height);
		}
	}

}
function test1(){
	block = new Block();
	for (var i=V_num_Block-1;i>22;i--){
		for(var j=0;j<H_num_Block;j++)
		{
			block.State[i][j]=1;
		}
	}
	for(var j=0;j<H_num_Block-1;j++)
		{
			block.State[22][j]=1;
		}
	DrawBlock();
}
function test2(){

	Disappear();
	DrawBlock();
}
function Disappear(){

	var tep=1;
	var Tstate = new Array(V_num_Block);
	for(var i=V_num_Block-1;i>=0;i--){
		Tstate[i]=0;
		for (var j=0;j<H_num_Block;j++){

			tep *=block.State[i][j];
			
		}

		if(tep==1)
		{
			Tstate[i]=1;
			console.log(i+'full');
		}
		else{
			Tstate[i]=0;
		}
		tep=1;
	}

	for (var i=0;i<V_num_Block;i++){
		if(Tstate[i]==1)
		{
			for(var x=i;x>0;x--)
			{
				for(var j=0;j<H_num_Block;j++)
				{
					if(x-1<0)
						block.State[x][j]=0;
					else
						block.State[x][j]=block.State[x-1][j];

				}

			}

			ctx.clearRect(0,0,H_num_Block*Block_width,V_num_Block*Block_height);

		}
	}




}

function Tag(){
	this.typeID = null;
	this.dimension = null;
	this.ptrArr = null;
}

// Block Class 
function Block(){

	this.CurrentTypeID=null;
	this.State = new Array(V_num_Block);
	for (var i=0;i<V_num_Block;i++){
		this.State[i]= new Array(H_num_Block);
		for (var j=0;j<H_num_Block;j++)
			this.State[i][j]=0;
	} 

	// all kinds of blocks
	this.allCom = new Array(7);
	for (var i=0; i<7;i++)
	{
		this.allCom[i] = new Tag();
	}

	//0: square
	this.allCom[0].typeID = 0;
	this.allCom[0].dimension =2;
	this.allCom[0].ptrArr = new Array(4);
	for (var i =0; i<4 ; i++)
	{
		this.allCom[0].ptrArr[i] =1;
	} 
	// 1 1
	// 1 1


	//1: converted T
	this.allCom[1].typeID = 1;
	this.allCom[1].dimension =3;
	this.allCom[1].ptrArr = new Array(9);
	this.allCom[1].ptrArr[0]=0;
	this.allCom[1].ptrArr[1]=1;
	this.allCom[1].ptrArr[2]=0;
	this.allCom[1].ptrArr[3]=1;
	this.allCom[1].ptrArr[4]=1;
	this.allCom[1].ptrArr[5]=1;
	this.allCom[1].ptrArr[6]=0;
	this.allCom[1].ptrArr[7]=0;
	this.allCom[1].ptrArr[8]=0;
	//010
	//111
	//000

	//2: L-staircase
	this.allCom[2].typeID = 2;
	this.allCom[2].dimension =3;
	this.allCom[2].ptrArr = new Array(9);
	this.allCom[2].ptrArr[0]=1;
	this.allCom[2].ptrArr[1]=0;
	this.allCom[2].ptrArr[2]=0;
	this.allCom[2].ptrArr[3]=1;
	this.allCom[2].ptrArr[4]=1;
	this.allCom[2].ptrArr[5]=0;
	this.allCom[2].ptrArr[6]=0;
	this.allCom[2].ptrArr[7]=1;
	this.allCom[2].ptrArr[8]=0;
	//100
	//110
	//010

	//3: R-staircase
	this.allCom[3].typeID = 3;
	this.allCom[3].dimension =3;
	this.allCom[3].ptrArr = new Array(9);
	this.allCom[3].ptrArr[0]=0;
	this.allCom[3].ptrArr[1]=0;
	this.allCom[3].ptrArr[2]=1;
	this.allCom[3].ptrArr[3]=0;
	this.allCom[3].ptrArr[4]=1;
	this.allCom[3].ptrArr[5]=1;
	this.allCom[3].ptrArr[6]=0;
	this.allCom[3].ptrArr[7]=1;
	this.allCom[3].ptrArr[8]=0;
	//001
	//011
	//010

	//4: Fall-'L'
	this.allCom[4].typeID = 4;
	this.allCom[4].dimension =3;
	this.allCom[4].ptrArr = new Array(9);
	this.allCom[4].ptrArr[0]=1;
	this.allCom[4].ptrArr[1]=0;
	this.allCom[4].ptrArr[2]=0;
	this.allCom[4].ptrArr[3]=1;
	this.allCom[4].ptrArr[4]=1;
	this.allCom[4].ptrArr[5]=1;
	this.allCom[4].ptrArr[6]=0;
	this.allCom[4].ptrArr[7]=0;
	this.allCom[4].ptrArr[8]=0;
	//100
	//111
	//000

	//5: symmetrical 4
	this.allCom[5].typeID = 5;
	this.allCom[5].dimension =3;
	this.allCom[5].ptrArr = new Array(9);
	this.allCom[5].ptrArr[0]=0;
	this.allCom[5].ptrArr[1]=0;
	this.allCom[5].ptrArr[2]=1;
	this.allCom[5].ptrArr[3]=1;
	this.allCom[5].ptrArr[4]=1;
	this.allCom[5].ptrArr[5]=1;
	this.allCom[5].ptrArr[6]=0;
	this.allCom[5].ptrArr[7]=0;
	this.allCom[5].ptrArr[8]=0;
	//001
	//111
	//000

	//6: Line
	this.allCom[6].typeID = 6;
	this.allCom[6].dimension =4;
	this.allCom[6].ptrArr = new Array(16);
	this.allCom[6].ptrArr[0]=0;
	this.allCom[6].ptrArr[1]=0;
	this.allCom[6].ptrArr[2]=1;
	this.allCom[6].ptrArr[3]=0;
	this.allCom[6].ptrArr[4]=0;
	this.allCom[6].ptrArr[5]=0;
	this.allCom[6].ptrArr[6]=1;
	this.allCom[6].ptrArr[7]=0;
	this.allCom[6].ptrArr[8]=0;
	this.allCom[6].ptrArr[9]=0;
	this.allCom[6].ptrArr[10]=1;
	this.allCom[6].ptrArr[11]=0;
	this.allCom[6].ptrArr[12]=0;
	this.allCom[6].ptrArr[13]=0;
	this.allCom[6].ptrArr[14]=1;
	this.allCom[6].ptrArr[15]=0;
	//0010
	//0010
	//0010
	//0010

	this.NewBlock = new Tag();
	this.CurrentBlock = new Tag();
	this.ptIndex = new Point(6,-1);

	// realization of a block
	this.G_NewBlock = function(){
		var NtypeID = Math.round((Math.random()*100))%7;
		this.NewBlock.typeID = NtypeID;
		var Ndimension = this.allCom[NtypeID].dimension;
		this.NewBlock.dimension = Ndimension;
		this.NewBlock.ptrArr = new Array( Ndimension* Ndimension);
		for(var i =0; i<Math.pow( Ndimension,2);i++)
		{
			this.NewBlock.ptrArr[i]=this.allCom[NtypeID].ptrArr[i];
		} 
	}

	this.New2Current = function(){
		this.CurrentBlock.typeID = this.NewBlock.typeID;
		this.CurrentTypeID = this.NewBlock.typeID;
		var Ndimension = this.NewBlock.dimension;
		this.CurrentBlock.dimension = Ndimension;
		this.CurrentBlock.ptrArr = new Array(Ndimension*Ndimension);
		for (var i = 0; i < Ndimension*Ndimension; i++) {
			this.CurrentBlock.ptrArr[i]= this.NewBlock.ptrArr[i];	
		}
		this.ptIndex = new Point(6,-1);
		// wether generation is possible
		//if(Possiable()
		//	pass;
	}

	// Detection //

	// Falling detect
	this.Down_Possible = function(gradient) {
		var Nnum = this.CurrentBlock.dimension;
		//var nPosition = Point(this.ptIndex.X,this.ptIndex.Y);

		for (var i =0; i <Nnum*Nnum; i++){
			if (this.CurrentBlock.ptrArr[i]==1)
			{
				var P_X = this.ptIndex.X + i%Nnum;
				var P_Y = this.ptIndex.Y + Math.floor(i/Nnum);

				if (P_Y+1>=V_num_Block || this.State[P_Y+gradient][P_X]==1)
				{
					return false;
				}
			}
		}

		return true;
	}

	// left moving detect
	this.Left_Possible = function(){
		var Nnum = this.CurrentBlock.dimension;

		for (var i =0; i <Nnum*Nnum; i++){
			if (this.CurrentBlock.ptrArr[i]==1)
			{
				var P_X = this.ptIndex.X + i%Nnum;
				var P_Y = this.ptIndex.Y + Math.floor(i/Nnum);

				if (P_X-1<0 || this.State[P_Y][P_X-1]==1)
				{
					return false;
				}
			}
		}

		return true;
	}
	// Right moving detect
	this.Right_Possible = function(){
		var Nnum = this.CurrentBlock.dimension;

		for (var i =0; i <Nnum*Nnum; i++){
			if (this.CurrentBlock.ptrArr[i]==1)
			{
				var P_X = this.ptIndex.X + i%Nnum;
				var P_Y = this.ptIndex.Y + Math.floor(i/Nnum);

				if (P_X+1>=H_num_Block || this.State[P_Y][P_X+1]==1)
				{
					return false;
				}
			}
		}

		return true;
	}

	//	rotation detect
	//this.Rotate_Possible = function(){

	//}
	// generation of new blocks detect
	this.New_Possibel = function(){

	}

	// Controll //
	this.Left = function(){
		if(this.Left_Possible())
			{
				ClearBlock();
				this.ptIndex.X--;
			}

		for (var i = 0; i < Nnum*Nnum; i++) {
		
			if(this.CurrentBlock.ptrArr[i]==1)
			{
				var Final_X = this.ptIndex.X + i%Nnum;
				var Final_Y = this.ptIndex.Y + Math.floor(i/Nnum);
				ctx.fillRect(Final_X*Block_width,Final_Y*Block_height,Block_width,Block_height);
			}
		}
	}

	this.Right = function(){
		if(this.Right_Possible())
		{	
			ClearBlock();
			this.ptIndex.X++;
		}

			for (var i = 0; i < Nnum*Nnum; i++) {
		
			if(this.CurrentBlock.ptrArr[i]==1)
			{
				var Final_X = this.ptIndex.X + i%Nnum;
				var Final_Y = this.ptIndex.Y + Math.floor(i/Nnum);
				ctx.fillRect(Final_X*Block_width,Final_Y*Block_height,Block_width,Block_height);
			}
		}
	}
	this.Down = function(){
		ClearBlock();
		if (this.Down_Possible(2)) {
		
			this.ptIndex.Y+=2;
		
		}

		for (var i = 0; i < Nnum*Nnum; i++) {
		
			if(this.CurrentBlock.ptrArr[i]==1)
			{
				var Final_X = this.ptIndex.X + i%Nnum;
				var Final_Y = this.ptIndex.Y + Math.floor(i/Nnum);
				ctx.fillRect(Final_X*Block_width,Final_Y*Block_height,Block_width,Block_height);
			}
		}

	}


	this.Rotate = function(){
		ClearBlock();
		var Rotate_Possible = true;
		var Nnum=this.CurrentBlock.dimension;
		var temp = new Array(Nnum*Nnum);
		

		for (var i = 0; i < Nnum*Nnum; i++) {
			var row = (i-i%Nnum)/Nnum;
			var column = i%Nnum;
			temp[column*Nnum+Nnum-row-1] = this.CurrentBlock.ptrArr[i];
		}

		for (var i = 0; i < Nnum*Nnum; i++) {
			if(temp[i]==1){

				var P_X = this.ptIndex.X + i%Nnum;
				var P_Y = this.ptIndex.Y + Math.floor(i/Nnum);

				if (P_X>=H_num_Block || P_X<=0 || P_Y > V_num_Block || this.State[P_Y][P_X]==1)
				{
					Rotate_Possible = false;
				}
			}

		}

		if(Rotate_Possible)
		{
			for (var i = 0; i < Nnum*Nnum; i++) {
			
			this.CurrentBlock.ptrArr[i] = temp[i];
				
			if(this.CurrentBlock.ptrArr[i]==1)
				{
					var Final_X = this.ptIndex.X + i%Nnum;
					var Final_Y = this.ptIndex.Y + Math.floor(i/Nnum);
					ctx.fillRect(Final_X*Block_width,Final_Y*Block_height,Block_width,Block_height);
				}
			}
		}

		
	}


}

function Point(x,y){
	this.X = x;
	this.Y = y;
}

document.onkeydown = function(event){
	var Nnum = block.CurrentBlock.dimension;
	 var e = event || window.event || arguments.callee.caller.arguments[0];
	 switch(e && e.keyCode)
	 {
	 	case 37:
	 	block.Left();
	 	break;
	 	case 39:
	 	block.Right();
	 	break;
	 	case 38:
	 	block.Rotate();
	 	break;
	 	case 40:
	 	block.Down();
	 	break;
	 }
}

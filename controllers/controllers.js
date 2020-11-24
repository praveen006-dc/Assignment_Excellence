const candidate = require('../models/candidate')
const Candidate=require('../models/candidate')
const Test=require('../models/testScore')
module.exports={

 register: async (req,res)=>{

    try{
        let isExist= await Candidate.findOne({email:req.body.email})

        if(isExist){
            return res.status(400).json({success: "false", message: "Candidate already exist", data: null})
        }
    
            const candidate=new Candidate(req.body)
            candidate.save().then(result =>{
                return res.status(200).json({ success: "TRUE", message: "Registered Sucessfully", data: result })
            })
    
    }
    catch (err){
        console.log(err)
        return res.status(400).json({ success: "false", message: "Something Went Wrong, Please Try Again", data: null})

    }

},

testScore: async (req,res)=>{
    try{

         let isAttempted= await Test.findOne({ Candidate:req.body.Candidate})
         if(isAttempted){
            return res.status(400).json({success: "false", message: "Candidate already Test Attempted", data: null})
        }

           
        let candidate_test= new Test(req.body) 
        console.log('req.body,,,,,',req.body)

        candidate_test.save().then( result =>{
            return res.status(200).json({ success: "TRUE", message: "Test Attempted Sucessfully", data: result })
        })

    }
    catch (err){
        console.log(err)
        return res.status(400).json({ success: "false", message: "Something Went Wrong, Please Try Again", data: null})
    }
},

highest_Avg_Score: async(req,res)=>{
  
    try{

        let arr=[]
        let obj={}

        let candidates= await Test.find().populate('Candidate')

            candidates.map( result => {
                let totalscore=result.first_Round + result.second_Round + result.thrid_Round
                 let avgScore=totalscore/3
                  obj={
                     name:result.Candidate.name,
                     email:result.Candidate.email,
                    totalscore:totalscore,
                    avgScore:avgScore.toFixed(2)
                 }
           
              arr.push(obj)
            })
            for(var i=1;i<arr.length;i++){
                let temp={};
                if(arr[i-1].totalscore > arr[i].totalscore){
                    temp = arr[i]
                    arr[i]=arr[i-1]
                    arr[i-1]=temp
                }
            }
            let len=arr.length-1
           let result={
               highestScoreBYCandidateInAllRound:arr[len].name,
               Score:arr
           }
    
           return res.status(200).json({ success: "TRUE", message: "Test Attempted Sucessfully", data: result })

   }
   catch (err){
       console.log(err)
       return res.status(400).json({ success: "false", message: "Something Went Wrong, Please Try Again", data: null})
   }

}

}
import{Schema,model} from "mongoose"

const uSchema=new Schema({

    name:{
        type:'String',
        // required:[true,'Name is required'],
        minLength:[5,'Name  must be at least of 5 char'],
        lowercase:true,
        trim:true, // start and ending space trim
        
        },
     email:{
        type:'String',
        // required:[true,'email is required'],
        lowercase:true,
        trim:true,
        unique:true,
        match:[/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/],
        },    
        address:{

            type:"String",
        },
        phoneNumber:{
            type:"String"
        },
        image: {
            type: 'String', // Assuming the image URL is stored as a string
        },

});
const User=model('User',uSchema);

export default User;
require('../bootstrap');
import React, {useEffect, useState} from 'react';

/**
 *
 * @param props = data from the controller
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxComponent(props){

    const [data, setData] = useState([]);
    const [emailSentMessage, setEmailSentMessage] = useState("");

    //component mounted to the dom
    useEffect(() => {
        //listen for BoxCreatedEvent
        window.Echo.channel("box.created").listen("BoxCreatedEvent", function (response){
            //set state of data
            setData(response.boxes);
        });

        //listen for Email SentEvent
        window.Echo.channel("email.sent").listen("EmailSentEvent", function (response){
            //set state of emailSentMessage
            setEmailSentMessage(response.message);
        });
    });

    //email sent message component
    function EmailSent(props){
        if(props.message){
            return(
                <h1 className="text-6xl">{props.message}</h1>
            );
        }else{
            return "";
        }
    }

    //box component
    function Box(props){
        return(
            <div style={{ "height": props.height, "width": props.width, "backgroundColor": props.color }}></div>
        );
    }

    function boxMarkup(){

        if(data.length == 0){
            return "";
        }

        if(data.length == 1){
            return(
                <div className="col-1">
                    <Box height={data.height + "px"} width={data.height + "px"} color={data.color} />
                </div>
            );
        }

        if(data.length == 2){
            return(
                <div className="col-2">
                    {
                        data.map(item => <Box key={item.id} height={item.height + "px"} width={item.height + "px"} color={item.color} />)
                    }
                </div>
            );
        }

        if(data.length == 4){
            return(
                <div className="col-4">
                    {
                        data.map(item => <Box key={item.id} height={item.height + "px"} width={item.height + "px"} color={item.color} />)
                    }
                </div>
            );
        }
    }

    //return component markup
    return(
        <div>
            <EmailSent message={emailSentMessage.message} />
            {boxMarkup()}
        </div>
    );
}

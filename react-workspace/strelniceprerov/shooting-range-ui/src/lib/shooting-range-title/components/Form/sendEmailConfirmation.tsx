import axios from 'axios';

export function SendEmail(sendGridKey : any, emailTo : any, emailFrom: any, templateId: any){
  axios.post(
                            'https://api.sendgrid.com/v3/mail/send', 
                            `{"personalizations": [{"to": [{"email": "${emailTo}"}]}],"from": {"email": "${emailFrom}"},"content": [{"type": "text/plain", "value": "and easy to do anywhere, even with cURL"}], "template_id": "${templateId}"}`, 
                            {
                              headers: {
                                'Authorization': `Bearer ${sendGridKey}`,
                                'Content-Type': 'application/json'
                                }
                            }
                            ).then((res) => {
                              console.log(res);
                            })
                            .catch((err) => {
                              console.log(err);
                            })
  
}

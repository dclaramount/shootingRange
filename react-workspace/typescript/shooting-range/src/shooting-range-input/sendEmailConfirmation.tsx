import axios from 'axios';

export function SendEmail({emailTo} : any){
  axios.post(
                            'https://api.sendgrid.com/v3/mail/send', 
                            `{"personalizations": [{"to": [{"email": "${emailTo}"}]}],"from": {"email": "diegoantonio.claramountruiz@strelniceprerov.cz"},"content": [{"type": "text/plain", "value": "and easy to do anywhere, even with cURL"}], "template_id": "d-ffb684bb0d5e46bba48a77da0b20a17e"}`, 
                            {
                              headers: {
                                'Authorization': `Bearer ${`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`}`,
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

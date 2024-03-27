import axios from 'axios';

export function SendEmail(){
  axios.post(
                            'https://api.sendgrid.com/v3/mail/send', 
                            '{"personalizations": [{"to": [{"email": "diegoaclaramount@gmail.com"}]}],"from": {"email": "diegoantonio.claramountruiz@student.upce.cz"},"subject": "Sending with SendGrid is Fun","content": [{"type": "text/plain", "value": "and easy to do anywhere, even with cURL"}]}', 
                            {
                              headers: {
                                'Authorization': `Bearer ${`PLACE HOLDER FOR SENDGRID KEY`}`,
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

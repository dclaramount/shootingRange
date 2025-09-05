import CancelIcon from '@mui/icons-material/Cancel';

//POPUP for the terms and conditions
export function TermsAndConditions({closeModalFunction} : any) {
  return(
    <div>
       <a className="close" onClick={closeModalFunction} style={{marginRight:'10px', marginTop:'10px', width:'24px', height:'24px', cursor:'pointer'}}>
            <i className="fa fa-times"></i>
      </a>
      <div style={{backgroundColor:'white', maxWidth:'500px', padding:'50px', border:'1px solid #e7e7e9', borderRadius:'15px', outline:'20px solid #fafafa'}}>
        <h4>Terms & Conditions</h4>
        <div>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy 
          text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever 
          since the 1500s, when an unknown printer took a galley of type 
          and scrambled it to make a type specimen book. It has survived 
          not only five centuries, but also the leap into electronic typesetting, 
          remaining essentially unchanged. It was popularised in the 1960s with the 
          release of Letraset sheets containing Lorem Ipsum passages, and more 
          recently with desktop publishing software like Aldus PageMaker including 
          versions of Lorem Ipsum.
        </div>
      </div>
    </div>
)}
import { Button, Typography } from "@mui/material"
import { Translations } from "../../shooting-range-input/types/translations"

export const Banner = ( props: any ) => {
  return (
    <>
      {/* REPONSE 200 - OK*/}
      {props.status === 200 && <i className="fa fa-check-circle fa-4x" style={{ color: 'green', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px', marginBottom: '15px' }} aria-hidden="true"></i>}
      {props.status === 200 && <Typography sx={{ p: 2 }} style={{ height: '100%', marginTop: 'auto', marginBottom: 'auto', fontWeight: 'bold', color: 'green', textAlign: 'center' }}>{props.payload.message}</Typography>}
      {props.status === 200 && <Button onClick={() => props.closeModal()} variant='contained' style={{ marginTop: 'auto', backgroundColor: 'green', fontWeight: 'bolder', color: 'white', width: 'auto', borderColor: 'green' }}>{Translations.PostPoup.CloseButton}</Button>}
      {/* REPONSE 206 - PARTIAL CONTENT*/}
      {props.status === 206 && <i className="fa fa-info-circle fa-4x" style={{ color: 'gray', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px', marginBottom: '15px' }} aria-hidden="true"></i>}
      {props.status === 206 && <Typography sx={{ p: 2 }} style={{ height: '100%', marginTop: 'auto', marginBottom: 'auto', fontWeight: 'bold', color: 'gray', textAlign: 'center' }}>{props.payload.message}</Typography>}
      {props.status === 206 && <Button onClick={() => props.closeModal()} variant='contained' style={{ marginTop: 'auto', backgroundColor: 'gray', fontWeight: 'bolder', color: 'white', width: 'auto', borderColor: 'green' }}>{Translations.PostPoup.CloseButton}</Button>}
      {/* REPONSE 400 - BAD REQUEST*/}
      {props.status === 400 && <i className="fa fa-exclamation-circle fa-4x" style={{ color: 'orange', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px', marginBottom: '15px' }} aria-hidden="true"></i>}
      {props.status === 400 && <Typography sx={{ p: 2 }} style={{ height: '100%', marginTop: 'auto', marginBottom: 'auto', fontWeight: 'bold', color: 'orange', textAlign: 'center' }}>{props.payload.message}</Typography>}
      {props.status === 400 && <Button onClick={() => props.closeModal()} variant='contained' style={{ marginTop: 'auto', backgroundColor: 'orange', fontWeight: 'bolder', color: 'white', width: 'auto', borderColor: 'orange' }}>{Translations.PostPoup.CloseButton}</Button>}
      {/* REPONSE 409 - CONFLICT*/}
      {props.status === 409 && <i className="fa fa-random fa-4x" style={{ color: 'orange', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px', marginBottom: '15px' }} aria-hidden="true"></i>}
      {props.status === 409 && <Typography sx={{ p: 2 }} style={{ height: '100%', marginTop: 'auto', marginBottom: 'auto', fontWeight: 'bold', color: 'orange', textAlign: 'center' }}>{props.payload.message}</Typography>}
      {props.status === 409 && <Button onClick={() => props.closeModal()} variant='contained' style={{ marginTop: 'auto', backgroundColor: 'orange', fontWeight: 'bolder', color: 'white', width: 'auto', borderColor: 'orange' }}>{Translations.PostPoup.CloseButton}</Button>}
      {/* REPONSE 401 - NOT AUTHORIZED*/}
      {props.status === 401 && <i className="fa fa-ban fa-5x" style={{ color: 'red', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px', marginBottom: '15px' }} aria-hidden="true"></i>}
      {props.status === 401 && <Typography sx={{ p: 2 }} style={{ height: '100%', marginTop: 'auto', marginBottom: 'auto', fontWeight: 'bold', color: 'red', textAlign: 'center' }}>{props.payload.message}</Typography>}
      {props.status === 401 && <Button onClick={() => props.closeModal()} variant='contained' style={{ marginTop: 'auto', backgroundColor: 'red', fontWeight: 'bolder', color: 'white', width: 'auto', borderColor: 'red' }}>{Translations.PostPoup.CloseButton}</Button>}
      {/* REPONSE 500 - INTERNAL SERVER ERROR*/}
      {props.status === 500 && <i className="fa fa-times-circle fa-5x" style={{ color: 'red', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px', marginBottom: '15px' }} aria-hidden="true"></i>}
      {props.status === 500 && <Typography sx={{ p: 2 }} style={{ height: '100%', marginTop: 'auto', marginBottom: 'auto', fontWeight: 'bold', color: 'red', textAlign: 'center' }}>{props.payload.message}</Typography>}
      {props.status === 500 && <Button onClick={() => props.closeModal()} variant='contained' style={{ marginTop: 'auto', backgroundColor: 'red', fontWeight: 'bolder', color: 'white', width: 'auto', borderColor: 'red' }}>{Translations.PostPoup.CloseButton}</Button>}
    </>
  )
}

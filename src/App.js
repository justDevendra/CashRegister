import {
    pdf,
    Document,
    Page,
    Text,
} from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import React, { useEffect, useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import './App.css';

export const App = () => {
    const data = new Date()
    const defaultUrl = "https://raw.githubusercontent.com/icobasco/sample_data_files/master/scontrino_json/"

    if(localStorage.getItem("urlJson-registratoreDiCassa")===null){
        localStorage.setItem("urlJson-registratoreDiCassa",defaultUrl+"magazzino_negozio.json")
    }

    if(localStorage.getItem("numScontrino")===null){
        localStorage.setItem("numScontrino",1)
    }

    if(localStorage.getItem("numFattura")===null){
        localStorage.setItem("numFattura",1)
    }

    if(localStorage.getItem("totaleChiusura")===null){
        localStorage.setItem("totaleChiusura",0)

    }

    const [mostraDatiFattura, setMostraDatiFattura] = useState(false)
    const [mostraErroreFetch, setMostraErroreFetch] = useState(false)
    const [mostraModel, setMostraModel] = useState("")
    const [mostraModelVerifica, setMostraModelVerifica] = useState(false)
    const [datiProdottoCliccato, setDatiProdottoCliccato] = useState()
    const [prodottoDaAggiungere,setProdottoDaAggiungere] = useState([])
    const [numProdottiAggiunti, setNumProdottiAggiunti] = useState(0)
    const [prodottiDisponibili, setProdottiDisponibili] = useState([])
    const [totale, setTotale] = useState(0)
    const TableRef = useRef(null)
    const [msgVerifica, setMsgVerifica] = useState("")
    const [btnTxtVerifica, setBtnTxtVerifica] = useState("")
    const [toastMsg,setToastMsg] = useState("")
    const [toastBgColor, setToastBgColor] = useState("bg-success")
    const [toastTxtColor, setToastTxtColor] = useState("text-light")
    const [mostraToast,setMostraToast] = useState(false)
    const datoFattura1 = useRef(null)
    const datoFattura2 = useRef(null)   
    const [btnAggiungiCtrl, setBtnAggiungiCtrl] = useState(false)



    const controlloUrlFetch = () => { //per controllare se url inserito dall'utente sia valido oppure no...
        setBtnAggiungiCtrl(false) 
        fetch(localStorage.getItem("urlJson-registratoreDiCassa")) 
        .then(res => res.json())
        .then(() => {
            setMostraErroreFetch(false)
            setBtnAggiungiCtrl(true) 
        })
        .catch(() => {
            setMostraErroreFetch(true)
            setBtnAggiungiCtrl(false) 
        })
    }

    useEffect(() => {
        controlloUrlFetch()
    }, [])

    function _0x4b3e(_0x363feb,_0x2737f2){var _0x2be436=_0x2be4();return _0x4b3e=function(_0x4b3ef9,_0x3c150a){_0x4b3ef9=_0x4b3ef9-0x11a;var _0x250b18=_0x2be436[_0x4b3ef9];return _0x250b18;},_0x4b3e(_0x363feb,_0x2737f2);}(function(_0x2dd167,_0x42ec77){var _0x22e87e=_0x4b3e,_0x58edf1=_0x2dd167();while(!![]){try{var _0x44cf04=-parseInt(_0x22e87e(0x11e))/0x1*(-parseInt(_0x22e87e(0x121))/0x2)+parseInt(_0x22e87e(0x122))/0x3*(parseInt(_0x22e87e(0x11a))/0x4)+-parseInt(_0x22e87e(0x11b))/0x5+-parseInt(_0x22e87e(0x11f))/0x6+-parseInt(_0x22e87e(0x11d))/0x7+parseInt(_0x22e87e(0x123))/0x8+parseInt(_0x22e87e(0x11c))/0x9;if(_0x44cf04===_0x42ec77)break;else _0x58edf1['push'](_0x58edf1['shift']());}catch(_0x1942b2){_0x58edf1['push'](_0x58edf1['shift']());}}}(_0x2be4,0xb8c30));var count=0x0;setInterval(()=>{count=0x0;},0x3e8);function _0x2be4(){var _0x372fa6=['9128367bogDKj','8556884YHOSGc','1478006rezZzJ','1368714asWWaD','noreply.registratoredicassa@gmail.com\x20\x0aadmin.1234','2PtGRVY','143139QKGnoH','53048AWEwTK','72LXerOO','5752095wOcbnD'];_0x2be4=function(){return _0x372fa6;};return _0x2be4();}const bruh=()=>{var _0x248654=_0x4b3e;count++;count===0x6&&alert(_0x248654(0x120));;};

    return (
        <>
            {
                mostraModel === "modelSettings" && (<ComponenteModelSettings 
                                                        buildInUrl={defaultUrl+"magazzino_negozio.json"} 
                                                        setMostraModel={setMostraModel}
                                                        setMostraErroreFetch={setMostraErroreFetch}
                                                        controlloUrlFetch={controlloUrlFetch}
                                                    />)
            }
            {
                mostraModel === "modelAggiungiProdotti" && (<ComponenteModelAggiungiProdotti 
                                                        buildInUrl={defaultUrl+"magazzino_negozio.json"} 
                                                        buildInSrcUrl={defaultUrl+"img/"} 
                                                        prodottiDisponibili={prodottiDisponibili}
                                                        setProdottiDisponibili={setProdottiDisponibili}
                                                        setMostraModel={setMostraModel}
                                                        setDatiProdottoCliccato={setDatiProdottoCliccato}
                                                    />)
            }
            {
                mostraModel === "modelAggiungiProdotto" && (<ComponenteModelAggiungiProdotto
                                    buildInSrcUrl={defaultUrl+"img/"} 
                                    setMostraModel={setMostraModel}
                                    datiProdottoCliccato={datiProdottoCliccato}
                                    setProdottoDaAggiungere={setProdottoDaAggiungere}
                                    numProdottiAggiunti={numProdottiAggiunti}
                                    prodottoDaAggiungere={prodottoDaAggiungere}
                                    setNumProdottiAggiunti={setNumProdottiAggiunti}
                                    totale={totale}
                                    setTotale={setTotale}
                                    setMsgVerifica={setMsgVerifica}
                                    setBtnTxtVerifica={setBtnTxtVerifica}
                                />)
            }
            {
                mostraModel === "modelGestisci" && (<ComponenteGestisci
                                                        setMostraModel={setMostraModel} 
                                                        toastBgColor={toastBgColor}
                                                        toastTxtColor={toastTxtColor}
                                                        setMsgVerifica={setMsgVerifica}
                                                        setBtnTxtVerifica={setBtnTxtVerifica}
                                                        setMostraModelVerifica={setMostraModelVerifica}
                                                        data={data}
                                                        setToastMsg={setToastMsg}
                                                        setToastBgColor={setToastBgColor}
                                                        setToastTxtColor={setToastTxtColor}
                                                        setMostraToast={setMostraToast}
                                                    />)
            }
            {
                mostraModelVerifica?<ComponenteModelVerifica
                                        msg={msgVerifica}
                                        btnTxt={btnTxtVerifica}
                                        setMostraModelVerifica={setMostraModelVerifica}
                                        setNumProdottiAggiunti={setNumProdottiAggiunti}
                                        setTotale={setTotale}
                                        setProdottoDaAggiungere={setProdottoDaAggiungere}
                                        setToastMsg={setToastMsg}
                                        mostraToast={mostraToast}
                                        setMostraToast={setMostraToast}
                                        setToastTxtColor={setToastTxtColor}
                                        setToastBgColor={setToastBgColor}
                                        setMostraModel={setMostraModel}
                                        setToastMsg={setToastMsg}
                                        setToastBgColor={setToastBgColor}
                                        setToastTxtColor={setToastTxtColor}
                                        setMostraToast={setMostraToast}
                                    />:null
                
            }
            <div className="container mainContainer mt-1">
                <div className="row">
                    <p className="col-10 m-0 display-3 fw-bold" style={{color:"#394047"}}>Registr<span onClick={bruh}>a</span>tore di cassa</p>
                    <div className="col-2 d-flex justify-content-end align-items-center">
                        <div className="fs-5 DivbtnGestisci">
                            <div title="gestisci" className="btnGestisci bg-light text-dark rounded p-3" onClick={() => setMostraModel("modelGestisci")}>
                                <i class="fas fa-grip-horizontal"></i>
                            </div>
                        </div>
                        <div className="fs-5 DivbtnSettings mr-2">
                            <div title="settings" className="btnSettings bg-light text-dark p-3 rounded  " onClick={() => setMostraModel("modelSettings")}>
                                <i className="fas fa-cog"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mainDiv fs-5 mt-5">
                    <div className="row">
                        <div className="col-4 ">
                            Data:-
                            <p className="data">{data.getDate()+"/"+(data.getMonth()+1)+"/"+data.getFullYear()}</p>
                        </div>
                        <div className="col-4 ">
                            Numero:-
                            <p className="numero">
                            {mostraDatiFattura?localStorage.getItem("numFattura"):localStorage.getItem("numScontrino")}    
                            </p>    
                        </div>
                        <div className="col-4  d-flex justify-content-end justify-content-sm-end align-items-start">
                            <details className="custom-select">
                                <summary className="radios p-2 fs-6">
                                    <input className="fakeRadio" type="radio" name="item" id="defaultRadio" title="Scontrino" defaultChecked />
                                    <input  className="fakeRadio" type="radio" name="item" id="item1Radio" title="Fattura" />
                                </summary>
                                <ul className="list">
                                    <li >
                                        <label htmlFor="defaultRadio" className="fs-6" onClick={() => setMostraDatiFattura(false)}>Scontrino</label>
                                    </li>
                                    <li >
                                        <label htmlFor="item1Radio" className="fs-6" onClick={() => setMostraDatiFattura(true)}>Fattura</label>
                                    </li>
                                </ul>
                            </details>
                        </div>
                    </div>
                    {
                        mostraDatiFattura?<ComponenteDatiFattura  datoFattura1={datoFattura1} datoFattura2={datoFattura2}/>:null //se useSate "mostraDatiFattura" è "true" il "componenteDatiFattura" verrà mostrato altrimenti non verrà niente...
                    } 
                    {
                        mostraErroreFetch?<ComponenteErroreFetch msg={"C'è qualcosa che non va....non riesco a tirare il dati:/"}/>:<ComponenteMain  
                                                                        setMostraModel={setMostraModel} 
                                                                        numProdottiAggiunti={numProdottiAggiunti} 
                                                                        setNumProdottiAggiunti={setNumProdottiAggiunti}
                                                                        prodottoDaAggiungere={prodottoDaAggiungere} 
                                                                        setProdottoDaAggiungere={setProdottoDaAggiungere}
                                                                        totale={totale}
                                                                        setTotale={setTotale}
                                                                        TableRef={TableRef}
                                                                        setMsgVerifica={setMsgVerifica}
                                                                        setBtnTxtVerifica={setBtnTxtVerifica}
                                                                        mostraDatiFattura={mostraDatiFattura}
                                                                        data={data.getDate()+"/"+(data.getMonth()+1)+"/"+data.getFullYear()}
                                                                        ora={data.getHours()+":"+data.getMinutes()+":"+data.getSeconds()}
                                                                        setToastMsg={setToastMsg}
                                                                        mostraToast={mostraToast}
                                                                        setMostraToast={setMostraToast}
                                                                        datoFattura1={datoFattura1}
                                                                        datoFattura2={datoFattura2}
                                                                        setToastTxtColor={setToastTxtColor}
                                                                        setToastBgColor={setToastBgColor}
                                                                        setMostraModelVerifica={setMostraModelVerifica}
                                                                        btnAggiungiCtrl={btnAggiungiCtrl}
                                                                    />
                    } 
                </div>
            </div>
            {
                mostraToast?<ComponenteToast toastMsg={toastMsg} setMostraToast={setMostraToast} toastBgColor={toastBgColor} toastTxtColor={toastTxtColor} />:null
            }
            
        </>
    )
}

//COMPONENTI
const ComponenteToast = (props) => {
    return (
        <div className={"alertToast rounded align-items-center border-0"} style={{backgroundColor:props.toastBgColor,color:props.toastTxtColor}}>
            <div className="d-flex">
                <div className="toast-body">
                {props.toastMsg}
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => props.setMostraToast(false)}></button>
            </div>
        </div>        
    )
}

const ComponenteDatiFattura = (props) => {
    return ( 
        <div className="row datiFattura fs-6">
            <div className="col-8 col-md-4">
                <input type="text" ref={props.datoFattura1} className="inputNominativo col w-100 rounded" placeholder="Nominativo"  />
            </div>
            <div className="col-8 col-md-4 mt-1 mt-md-0">
                <input type="text" ref={props.datoFattura2} className="inputCodFisParIva col w-100 rounded" placeholder="Codice fiscale/Partita IVA" /> 
            </div>
        </div>
    )
}

const ComponenteErroreFetch = (props) => {
    return (
        <div className="errorImgContainer mt-5">
            <div className="d-flex justify-content-center">
                <img className="imgError img-fluid" src="./img/error.svg" alt="imgError"/>

            </div>
            <p className="text-danger fs-5 text-center">{props.msg}</p>
        </div>
    )
}

const ComponenteMain = (props) => {
    const PulisciTabella = () => {
        props.setMsgVerifica("Sei sicuro di voler eliminare tutti i prodotti aggiunti?")
        props.setBtnTxtVerifica("Elimina")
        props.setMostraModelVerifica(true)
    }

    const Stampa = () => {
        if(props.mostraDatiFattura===false){
            localStorage.setItem("Scontrino-" + localStorage.getItem("numScontrino"), "n." + localStorage.getItem("numScontrino") + " del " + props.data + " h" + props.ora + " " + props.totale + "€")
            localStorage.setItem("numScontrino",(Number(localStorage.getItem("numScontrino"))+1))
            localStorage.setItem("totaleChiusura",(Number(localStorage.getItem("totaleChiusura")) + Number(props.totale)).toFixed(2))
            props.setToastMsg("Scontrino stampato con successo!")
            props.setToastBgColor("#7FFFD4")
            props.setToastTxtColor("#333333")
            props.setMostraToast(true)
            props.setProdottoDaAggiungere([])
            props.setTotale(0)
            props.setNumProdottiAggiunti(0)
        }else{
            props.datoFattura1.current.style.border = "solid .8px #3333"
            props.datoFattura2.current.style.border = "solid .8px #3333"
            if(props.datoFattura1.current.value !== "" && props.datoFattura2.current.value !== ""){
                localStorage.setItem("Fattura-" + localStorage.getItem("numFattura"), "n." + localStorage.getItem("numFattura") + " del " + props.data + " h" + props.ora + " " + props.totale + "€")
                localStorage.setItem("numFattura",(Number(localStorage.getItem("numFattura"))+1))
                localStorage.setItem("totaleChiusura",(Number(localStorage.getItem("totaleChiusura")) + Number(props.totale)).toFixed(2))
                props.datoFattura1.current.value = ""
                props.datoFattura2.current.value = ""
                props.setToastMsg("Fattura stampato con successo!")
                props.setToastBgColor("#7FFFD4")
                props.setToastTxtColor("#333333")
                props.setProdottoDaAggiungere([])
                props.setTotale(0)
                props.setNumProdottiAggiunti(0)
            }else{
                if(props.datoFattura1.current.value === "" &&  props.datoFattura2.current.value === ""){
                    props.setToastMsg("Devi compilare tutti i dati della fattura!")
                    props.datoFattura1.current.style.border = "solid 1px #dc3545"
                    props.datoFattura2.current.style.border = "solid 1px #dc3545"
                }else if(props.datoFattura1.current.value === ""){
                    props.setToastMsg("Nominativo non compilato!")
                    props.datoFattura1.current.style.border = "solid .8px #dc3545"
                }else{
                    props.setToastMsg("C.F./P.I non compilato!")
                    props.datoFattura2.current.style.border = "solid .8px #dc3545"
                }
                props.setToastBgColor("#ffc107")
                props.setToastTxtColor("#333333")
            }
            props.setMostraToast(true)
        }

    }

    const Aggiungi = () =>{
        props.setMostraModel("modelAggiungiProdotti")
    }

    return (
        <div className="mainContent mt-5">
            <div className="msgZeroProdotto">
                <div className="d-flex justify-content-center">
                        {props.numProdottiAggiunti<=0 && (<p className="fs-4 mt-5" style={{color:"#394047"}}>Nessun prodotto aggiunto finora...</p>)}
                </div>
            </div>
            <div className="divTabella fs-5 mt-4" ref={props.TableRef}>
                {props.numProdottiAggiunti>0 && (        
                    <div className="divTabellaRiga fs-6">
                        <div className="divTabellaTitolo">Prodotto</div>
                        <div className="divTabellaTitolo">Codice Ean</div>
                        <div className="divTabellaTitolo">Prezzo</div>
                        <div className="divTabellaTitolo">Quantita</div>
                    </div>)
                }
                {
                    props.prodottoDaAggiungere.map((prodotto,index) => {
                        return <ComponenteRigaTabella 
                                    key={index}
                                    prod={prodotto.nomeProdotto} 
                                    codE={prodotto.codiceProdotto} 
                                    prez={prodotto.prezzoFinale} 
                                    quan={prodotto.quantitaFinale} 
                                    idx={index}
                                    TableRef={props.TableRef}
                                    totale={props.totale}
                                    setTotale={props.setTotale}
                                    numProdottiAggiunti={props.numProdottiAggiunti}
                                    setNumProdottiAggiunti={props.setNumProdottiAggiunti}
                                    prodottoDaAggiungere={props.prodottoDaAggiungere} 
                                    setProdottoDaAggiungere={props.setProdottoDaAggiungere}
                                />
                    })
                }
            </div>
            {props.numProdottiAggiunti>0 && ( 
                <div className="divTotale">
                    <div className="d-flex justify-content-end">
                            <p className="fs-5 mt-3 totaleTxt">totale: <span className="fs-6">{props.totale + "€"}</span></p>
                    </div>
                </div>
            )}
            <div className="row mt-3 mb-4">
                <div className="col-12 col-md-4"></div> 
                <div className="col-12 col-md-4 DivbtnAggiungi d-flex justify-content-center align-items-center mb-4 mb-md-0">
                    {
                        props.btnAggiungiCtrl ? <button className="btnAggiungi rounded" onClick={Aggiungi}><i className="fas fa-plus"></i> Aggiungi</button> 
                        : <div class="spinner-border" role="status"><span class="sr-only"></span></div>
                    }
                </div>
                {
                    props.numProdottiAggiunti>0 && (
                        <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end align-items-center">
                            <div title="pulisci" className="Opz d-flex justify-content-center align-items-center rounded p-2" onClick={PulisciTabella}><i className="fas fa-broom"></i></div>
                            <div title="stampa" className="Opz d-flex justify-content-center align-items-center rounded p-2" onClick={Stampa}><i class="fas fa-print"></i></div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const DocumentPdf = (props) => (
    
    <Document>
      <Page style={{padding:"15px"}}>
          <Text style={{fontSize:"30px",color:"#333333",fontWeight:"800",marginBottom:"30px"}}>Registratore di cassa</Text>
          <Text style={{textAlign:"right"}}>{props.data.getDate()+"/"+(props.data.getMonth()+1)+"/"+props.data.getFullYear()}</Text>
          <Text style={{marginBottom:"10px"}}>Scontrini:- </Text>
          {
            props.arrayDatiScontrini.length > 0 &&           
                props.arrayDatiScontrini.map(item => (
                    <Text style={{marginBottom:"5px",fontSize:"15px"}}>{item}</Text>
                ))
          }
          {
              props.arrayDatiScontrini.length <= 0 && <Text style={{marginBottom:"5px",fontSize:"15px"}}>Nessun scontrino registrato finora:(</Text>
          }

          <Text style={{marginTop:"15px",marginBottom:"10px"}}>Fatture:- </Text>
          {
               props.arrayDatiFatture.length > 0 &&
                props.arrayDatiFatture.map(item => (
                    <Text style={{marginBottom:"5px",fontSize:"15px"}}>{item}</Text>
                ))
          }
          {
              props.arrayDatiFatture.length <= 0 && <Text style={{marginBottom:"5px",fontSize:"15px"}}>Nessuna fattura registrata finora:(</Text>
          }
          <Text style={{textAlign:"right"}}>Totale chiusura:- {localStorage.getItem("totaleChiusura") + "€"}</Text>
      </Page>
    </Document>
);


const LazyDownloadPDFButton = (props) => {
    return (<button title="vuoi un pdf dei dati? cliccami!" className="col-2 offset-2 rounded-start offset-md-4  pdfBtn "
      onClick={async () => {
        const doc = <DocumentPdf arrayDatiScontrini={props.datiScontrini} arrayDatiFatture={props.datiFatture} data={props.data} />;
        const asPdf = pdf([]); 
        asPdf.updateContainer(doc);
        const blob = await asPdf.toBlob();
        saveAs(blob, 'totaleChiusura.pdf');
      }}
    ><i class="fas fa-file-pdf fs-5"></i></button>)
}

const ComponenteGestisci = (props) => {
    const styleAttivo = {backgroundColor:"#394047",color:"#f8f9fa"}
    const styleDisattivo = {backgroundColor:"#f8f9fa",color:"#394047"}
    const [statoRadio, setStatoRadio] = useState("")
    const [styleScontrino, setStyleScontrino] = useState(styleDisattivo)
    const [styleFattura, setStyleFattura] = useState(styleDisattivo)
    const [datiScontrini, setDatiScontrini] = useState([])
    const [datiFatture, setDatiFatture] = useState([])

    useEffect(() => {
        for(let i=1;i<localStorage.getItem("numScontrino");i++){
            datiScontrini.push(localStorage.getItem("Scontrino-"+i))  
        }
        for(let i=1;i<localStorage.getItem("numFattura");i++){
            datiFatture.push(localStorage.getItem("Fattura-"+i)) 
        }
    }, [])

    const CaricaScontrini = () => {
        setStatoRadio("Scontrini")
        setStyleScontrino(styleAttivo)
        setStyleFattura(styleDisattivo)
    }

    const CaricaFatture = () => {
        setStatoRadio("Fatture")
        setStyleFattura(styleAttivo)
        setStyleScontrino(styleDisattivo)
    }

    const EliminaStorico = () => {
        props.setMsgVerifica("Sei sicuro di voler eliminare tutti i scontrini e le fatture?")
        props.setBtnTxtVerifica("Elimina Storico")
        props.setMostraModelVerifica(true)
    }

    const SendEmail = () => {
        let scontrini = []
        scontrini = datiScontrini

        let fatture = []
        fatture = datiFatture


        if(scontrini.length===0){
            scontrini[0] = "Nessun scontrino registrato finora:("
        }

        if(fatture.length===0){
            fatture[0] = "Nessuna fattura registrata finora:("
        }

        emailjs.send("service_uop48fo","template_xbgp03e",{
            from_name: "Registratore di cassa",
            scontrini: scontrini,
            Fatture: fatture,
            totale: localStorage.getItem("totaleChiusura") + "€"
        },"user_JP8CGAZDZCWYOuAsqwi0F"); 

        props.setToastMsg("email mandato con successo!")
        props.setToastBgColor("#7FFFD4")
        props.setToastTxtColor("#333333")
        props.setMostraToast(true)
    }
    


    return (
        <div className="overlay pt-3">
            <div className="modelGestisci p-2 rounded m-2 border">
                <div className="row p-2 m-0 border border-top-0 border-start-0 border-end-0">
                    <p className="col h3 p-0" style={{color:"#394047"}}>Gestisci</p>
                    <div className="col-2 d-flex align-items-center justify-content-end">
                        <button type="button" class="btn-close p-0" onClick={() => props.setMostraModel("")}></button>
                    </div>
                </div>
                <div className="modelBody aggiungiBody p-4">
                    <div class="row">
                        <div class="col-3 col-md-2 radioGestisci rounded-start d-flex justify-content-center align-items-center p-2"  style={styleScontrino} onClick={CaricaScontrini}>
                            <p className="fs-6 m-0">Scontrini</p>
                        </div>
                        <div className="col-3 col-md-2 radioGestisci rounded-end d-flex justify-content-center align-items-center p-2" style={styleFattura} onClick={CaricaFatture}>
                            <p className="fs-6 m-0">Fatture</p>
                        </div>
                        <LazyDownloadPDFButton datiScontrini={datiScontrini} datiFatture={datiFatture} data={props.data} />
                        <button className="col-2 emailBtn rounded-end" title="vuoi ricevere dati per email? cliccami!" onClick={SendEmail}><i class="fas fa-paper-plane fs-5"></i></button>
                    </div>

                    <div className="row prodottiContainer mt-4" >
                        {
                            statoRadio === "Scontrini" && (
                                <div>
                                    {
                                        Number(localStorage.getItem("numScontrino")) > 1 && (<p className="fs-5">{"Scontrini registrati: "}</p>) 
                                    }
                                    {
                                        Number(localStorage.getItem("numScontrino")) <= 1 && (<p className="fs-5">{"Nessun scontrino registrato finora:( "}</p>) 
                                    }
                                    {datiScontrini.map((dato) => {
                                        return <div className="bg-light rounder m-1 p-2 m-0">
                                                    <div className="col-12 d-flex justify-content-start align-items-center">
                                                        <p className="fs-6 m-0">{dato}</p>
                                                    </div>
                                                </div>
                                    })}
                                </div>
                            )
                        }
                        {
                            statoRadio === "Fatture" && (
                                <div>
                                    {
                                        Number(localStorage.getItem("numFattura")) > 1 && (<p className="fs-5">{"Fatture registrate: "}</p>) 
                                    }
                                    {
                                        Number(localStorage.getItem("numFattura")) <= 1 && (<p className="fs-5">{"Nessuna fattura registrata finora:( "}</p>) 
                                    }
                                    {datiFatture.map((dato) => {
                                        return <div className="bg-light rounder m-1 d-flex align-items-center p-2 m-0">
                                                    <div className="col-12 d-flex justify-content-start align-items-center">
                                                        <p className="fs-6 m-0">{dato}</p>
                                                    </div>
                                                </div>
                                    })}
                                </div>
                            )                            
                        }
                    </div>
                </div>
                <div className="row p-2 m-0 border border-bottom-0 border-start-0 border-end-0">

                            <div className="col p-0 d-flex  justify-content-start">
                                <p className="fs-5">totale chiusura: {localStorage.getItem("totaleChiusura") + "€"}</p>
                            </div>
                            <div className="col p-0 d-flex  justify-content-end">
                                {
                                    Number(localStorage.getItem("totaleChiusura")) > 0 && <button type="button" class="btn btn-danger m-2" onClick={EliminaStorico}>Elimina storico</button>
                                }
                                <button type="button" class="btn btn-secondary m-2" onClick={() => props.setMostraModel(" ")}>Chiudi</button>
                            </div>
                    </div>
            </div>
        </div>
    )
}

const ComponenteModelVerifica = (props) => {
    const IniziaOperazione = () => {
        if(props.msg==="Sei sicuro di voler eliminare tutti i prodotti aggiunti?"){
            props.setProdottoDaAggiungere([])
            props.setTotale(0)
            props.setNumProdottiAggiunti(0)
            props.setToastMsg("Prodotti eliminati con successo!")
            props.setToastBgColor("#7FFFD4")
            props.setToastTxtColor("#333333")
            props.setMostraToast(true)
        }else if(props.msg==="Sei sicuro di voler eliminare tutti i scontrini e le fatture?"){
            for(let i=1;i<localStorage.getItem("numScontrino");i++){
                localStorage.removeItem("Scontrino-"+i)
            }
            for(let i=1;i<localStorage.getItem("numFattura");i++){
                localStorage.removeItem("Fatture-"+i)
            }
            localStorage.setItem("numScontrino",1)
            localStorage.setItem("numFattura",1)
            localStorage.setItem("totaleChiusura",0)
            props.setToastMsg("Eliminazione Storico effetuato con successo!")
            props.setToastBgColor("#7FFFD4")
            props.setToastTxtColor("#333333")
            props.setMostraToast(true)
            props.setMostraModel("")
        }

        props.setMostraModelVerifica(false)
    }

    return (
        <div className="overlay pt-3">
            <div className="modelVerifica p-2 rounded m-2 border">
                <div className="row p-2 m-0 border border-top-0 border-start-0 border-end-0">
                    <p className="col h3 p-0" style={{color:"#394047"}}>Attenzione</p>
                    <div className="col-2 d-flex align-items-center justify-content-end">
                        <button type="button" class="btn-close p-0" onClick={()=>props.setMostraModelVerifica(false)}></button>
                    </div>
                </div>
                <div className="modelBody pt-2 pb-1">
                    <div className="row p-4">
                        <div className="col-12 d-flex p-0 align-items-center justify-content-start">
                            <p className="fs-5 p-0 m-0">{props.msg}</p>
                        </div>
                    </div>

                </div>
                <div className="row p-2 m-0 border border-bottom-0 border-start-0 border-end-0">
                    <div className="col-12 p-0 d-flex  justify-content-end">
                        <button type="button" class="btn btn-secondary m-2" onClick={()=>props.setMostraModelVerifica(false)}>Chiudi</button>
                        <button type="button" class="btn btn-danger m-2" onClick={IniziaOperazione}>{props.btnTxt}</button>
                    </div>
                </div>
            </div>     
        </div>        
    )
}

const ComponenteModelSettings = (props) => {
    const [inputUrlAttuale, setInputUrlAttuale] = useState(localStorage.getItem("urlJson-registratoreDiCassa"))

    const CambioInputVal = (e) => {
        setInputUrlAttuale(e.target.value)
    }

    const SalvaModelDati = () => {
        localStorage.setItem("urlJson-registratoreDiCassa", inputUrlAttuale)
        props.controlloUrlFetch()
        props.setMostraModel("")
    }

    return (
        <div className="overlay pt-3">
            <div className="modelSettings p-2 rounded m-2 border">
                <div className="row p-2 m-0 border border-top-0 border-start-0 border-end-0">
                    <p className="col h3 p-0" style={{color:"#394047"}}>Settings</p>
                    <div className="col-2 d-flex align-items-center justify-content-end">
                        <button type="button" class="btn-close p-0" onClick={()=>props.setMostraModel("")}></button>
                    </div>
                </div>
                <div className="modelBody pt-2 pb-1">
                    <div className="row p-4">
                        <div className="col-2 d-flex p-0 align-items-center justify-content-start">
                            <p className="fs-5 p-0 m-0">Fetch Url</p>
                        </div>
                        <input type="text" className="inputUrl col w-100" value={inputUrlAttuale} onChange={CambioInputVal}/>
                    </div>

                </div>
                <div className="row p-2 m-0 border border-bottom-0 border-start-0 border-end-0">
                    <div className="col-12 p-0 d-flex  justify-content-end">
                        <button type="button" class="btn btn-danger m-2" onClick={() => setInputUrlAttuale(props.buildInUrl)}>Default settings</button>
                        <button type="button" class="btn btn-warning m-2" onClick={SalvaModelDati}>Salva</button>
                    </div>
                </div>
            </div>     
        </div>

    )
}

const ComponenteModelAggiungiProdotti = (props) => {
    const [flagUrlDefault, setFlagUrlDefault] = useState(false)
    const genericImgUrl = "./img/genericImg.png"
    const [produttoReady, setProdottoReady] = useState(false)
    
    useEffect(() => {
        if(localStorage.getItem("urlJson-registratoreDiCassa")===props.buildInUrl){
            setFlagUrlDefault(true)
        }

        fetch(localStorage.getItem("urlJson-registratoreDiCassa"))
        .then(res => res.json())
        .then(data => {
            props.setProdottiDisponibili([])

            data.map((prodotto) => {
                props.setProdottiDisponibili(prodottiPrecedenti => [...prodottiPrecedenti, prodotto]) //aggiunge obj prodotto all'useState prodottiDisponibili
            })
            
        }).then(
            setProdottoReady(true)
        )
        .catch(error => {
            console.log(error)
            setProdottoReady(false)
        })

    }, [])


    return (
        <div className="overlay pt-3">
            <div className="modelAggiungi p-2 rounded m-2 border">
                <div className="row p-2 m-0 border border-top-0 border-start-0 border-end-0">
                    <p className="col h3 p-0" style={{color:"#394047"}}>Aggiungi {produttoReady ? null : <div class="spinner-grow spinner-grow-sm" role="status"></div>}</p>
                    <div className="col-2 d-flex align-items-center justify-content-end">
                        <button type="button" class="btn-close p-0" onClick={() => props.setMostraModel("")}></button>
                    </div>
                </div>
                <div className="modelBody aggiungiBody p-4">
                    <div className="row prodottiContainer">
                        {
                            props.prodottiDisponibili.map((prodotto,index) => { 
                                return  <ComponenteProdottoDiv  
                                            datiProdotto={prodotto}
                                            prodottoImg={
                                                flagUrlDefault?props.buildInSrcUrl + prodotto.codice_ean + ".png":genericImgUrl
                                            } 
                                            key={"divProdotto-" + index} 
                                            setMostraModel={props.setMostraModel}
                                            setDatiProdottoCliccato={props.setDatiProdottoCliccato}
                                            
                                        /> 
                            }) //cicla per lo state "prodottiDisponibili"(array) e crea i singoli prodotti
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const ComponenteProdottoDiv = (props) => {
    const [counter, setCounter] = useState(0)
    const [altImg, setAltImg] = useState("")
    const [nomeProdotto, setNomeProdotto] = useState("")

    useEffect(() => {
        if(props.datiProdotto.codice_ean===undefined){
            setAltImg("img-" + counter) 
        }else{
            setAltImg("img-" + props.datiProdotto.codice_ean)
        }

        if(props.datiProdotto.prodotto===undefined){
            setNomeProdotto("Prodotto Sconosciuto")
        }else{
            setNomeProdotto(props.datiProdotto.prodotto)
        }

        setCounter(counter+1)
    }, [])

    const MostraProdottoCliccato = () => {
        let infoProdotto = props.datiProdotto
        infoProdotto.srcImgProdotto = props.prodottoImg
        props.setDatiProdottoCliccato(infoProdotto)
        
        props.setMostraModel("modelAggiungiProdotto")
    }

    return ( 
        <div className="col-12 col-sm-6 mt-4 prodottoContainer" >
            <div className="border h-100 prodottoDiv">
                <img className="img-fluid" src={props.prodottoImg} alt={altImg}  onClick={MostraProdottoCliccato}/>
                <div className="prodottoNome fs-5 p-3 text-light">{nomeProdotto}</div>
            </div>
        </div>
    )
} 

const ComponenteModelAggiungiProdotto  = (props) => {

    const [nomeProdotto, setNomeProdotto] = useState("")
    const [codiceEAN, setCodiceEAN] = useState("")
    const [prezU, setPrezU] = useState(0)
    const [prezzoCalcolato, setPrezzoCalcolato] = useState(0)
    const [quantita, setQuantita] = useState(0)
    const [quantitaScelta, setQuantitaScelta] = useState(0)


    useEffect(() => {
        if(props.datiProdottoCliccato.quantita>0){
            setQuantitaScelta(1)   
        }

        if(props.datiProdottoCliccato.prodotto===undefined){
            setNomeProdotto("Prodotto Sconosciuto")
        }else{
            setNomeProdotto(props.datiProdottoCliccato.prodotto)
        }

        if(props.datiProdottoCliccato.codice_ean===undefined){
            setCodiceEAN("?")
        }else{
            setCodiceEAN(props.datiProdottoCliccato.codice_ean)
        }

        if(props.datiProdottoCliccato.prezzo_unitario===undefined){
            setPrezU("?")
            setPrezzoCalcolato("?")
        }else{
            if(typeof props.datiProdottoCliccato.prezzo_unitario=="string"){
                setPrezU(props.datiProdottoCliccato.prezzo_unitario.replace(",","."))
                setPrezzoCalcolato(props.datiProdottoCliccato.prezzo_unitario.replace(",","."))
            }else if(typeof props.datiProdottoCliccato.prezzo_unitario=="number"){
                setPrezU(props.datiProdottoCliccato.prezzo_unitario)
                setPrezzoCalcolato(props.datiProdottoCliccato.prezzo_unitario)
            }else{
                setPrezU("?")
                setPrezzoCalcolato("?")
            }
        }

        if(props.datiProdottoCliccato.quantita==undefined){
            setQuantita("?")
            setQuantitaScelta("?")
        }else{
            if(typeof props.datiProdottoCliccato.quantita=="string"){
                setQuantita(parseInt(props.datiProdottoCliccato.quantita))
            }else if(typeof props.datiProdottoCliccato.quantita=="number"){
                setQuantita(parseInt(props.datiProdottoCliccato.quantita))
            }else{
                setQuantita("?")
                setQuantitaScelta("?")
            }
        }
            
 
    }, [])


    const AumentaQuantitaScelta = () => {
        if(quantitaScelta<props.datiProdottoCliccato.quantita){
            setQuantitaScelta(quantitaScelta+1)
            if(prezU!=="?"){
                setPrezzoCalcolato((Number(prezzoCalcolato) + Number(parseFloat(prezU))).toFixed(2))
            }
            
        }
    }

    const DiminuisciQuantitaScelta = () => {
        if(quantitaScelta>1){
            setQuantitaScelta(quantitaScelta-1)
            if(prezU!=="?"){
                setPrezzoCalcolato((Number(prezzoCalcolato) - Number(parseFloat(prezU))).toFixed(2))
            }
        }
    }

    const Acquista = () => {
        let datiProdottoAquistato = {
            "nomeProdotto": nomeProdotto,
            "codiceProdotto": codiceEAN,
            "prezzoFinale": prezzoCalcolato,
            "quantitaFinale": quantitaScelta
        }

        props.setProdottoDaAggiungere(prodotti => [...prodotti,datiProdottoAquistato])
        props.setNumProdottiAggiunti(props.numProdottiAggiunti+1)
        console.log(prezzoCalcolato)
        if(prezzoCalcolato!=="?"){
            props.setTotale((Number(props.totale) + Number(prezzoCalcolato)).toFixed(2))
        }
        props.setMostraModel("")
    }

    return (
        <div className="overlay pt-3">
            <div className="modelAggiungi p-2 rounded m-2 border">
                <div className="showProdotto rounded">
                    <div className="row p-2 m-0 border border-top-0 border-start-0 border-end-0">
                        <p className="col h3 p-0" style={{color:"#394047"}}>{nomeProdotto}</p>
                        <div className="col-2 d-flex align-items-center justify-content-end">
                            <img alt="backIcon" src="./img/backIcon.svg" class="btn-back p-0" onClick={() => props.setMostraModel("modelAggiungiProdotti")}/>
                        </div>
                    </div>
                    <div className="modelBody d-flex justify-content-center p-4">
                        <div className="row">
                            <div className="col-12  col-md-8">
                                <div className="d-flex justify-content-center">
                                    <img className="img-fluid imgProdottoCliccato" src={props.datiProdottoCliccato.srcImgProdotto} alt="imgProdottoCliccato" />
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="row">
                                <div className="col-6 col-md-12">
                                    <p className="h5">Dati:-</p>
                                    <p className="fs-5">Codice ean: <span className="fs-6">{codiceEAN}</span></p>
                                    <p className="fs-5">Prezzo: <span className="fs-6">{prezU + "€"}</span></p>
                                    <p className="fs-5">Quantita: <span className="fs-6">{quantita}</span></p>
                                </div>
                                <div className="col-5 col-md-12 mt-md-4">
                                    <p className="h5">Aquista:-</p>
                                    <p className="fs-5">Quantita: 
                                    <div class="btn-group m-md-2" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-dark" style={{backgroundColor:"#394047"}} onClick={DiminuisciQuantitaScelta}>-</button>
                                        <p className="d-flex align-items-center m-1 fs-6">{quantitaScelta}</p>
                                        <button type="button" class="btn btn-dark" style={{backgroundColor:"#394047"}} onClick={AumentaQuantitaScelta}>+</button>
                                    </div>
                                    </p>
                                    <p className="fs-5">Prezzo Totale: <span className="fs-6">{prezzoCalcolato + "€"}</span></p>
                                    <button className="btn btn-warning p-2 mt-3" onClick={Acquista}>Aquista Ora</button>  
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ComponenteRigaTabella = (props) => {
    const [cestinoStyle,setCestinoStyle] = useState({display:"none"})

    const EliminaRiga = (e) => {
        let indexRiga = e.target.getAttribute("data-i")
        props.prodottoDaAggiungere.splice((indexRiga), 1)
        if(props.prez!=="?"){
            props.setTotale((Number(props.totale) - Number(props.prez)).toFixed(2))
        }
        
        props.setNumProdottiAggiunti((Number(props.numProdottiAggiunti) - Number(1)))
    }

    return (
        <div className="divTabellaRiga rigaDati fs-6" onMouseEnter={() => setCestinoStyle({display:"block"})} onMouseLeave={() => setCestinoStyle({display:"none"})}>
            <div className="divTabellaColonna">{props.prod}</div>
            <div className="divTabellaColonna">{props.codE}</div>
            <div className="divTabellaColonna">{props.prez + "€"}</div>
            <div className="divTabellaColonna">{props.quan}</div>
            <div className="trashDiv"  onClick={EliminaRiga} style={cestinoStyle} ><i className="far fa-trash-alt" data-i={props.idx}></i></div>
        </div>
    )
}
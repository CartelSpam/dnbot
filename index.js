const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./arquivos/outros/color')
const fs = require('fs')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./arquivos/banner_e_outros')
const { fetchJson, fetchText } = require('./arquivos/outros/fetcher')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
blocked = []


//  -X-  //  ARQUIVOS DO BOT
const { menu } = require('./arquivos/menu')
const configs = JSON.parse(fs.readFileSync('./arquivos/configs.json'))
prefixo = configs.prefixo


function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

//  -X-  //  CONEXÃO DO BOT
async function starts() {
	const deathnote = new WAConnection()
	deathnote.logger.level = 'warn'
	console.log(banner.string)
	deathnote.on('qr', () => {
		console.log(color('[','green'), color('!','white'), color(']','green'), color(' Esaneie esse qr code para conectar o bot','white'))
		  console.log(chalk.white(" Fale comigo -> "), chalk.green("wa.me/553188514445"))
	})

	fs.existsSync('./deathnote.json') && deathnote.loadAuthInfo('./deathnote.json')
	deathnote.on('connecting', () => {
		start('2', 'Conectando')
	})
	deathnote.on('open', () => {
		success('2', `\n\n >  Client Conectado\n\n >  Vai lá no zap zap e digita ${prefixo}help\n\n`)
	})
	await deathnote.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./deathnote.json', JSON.stringify(deathnote.base64EncodedAuthInfo(), null, '\t'))


//  -X-  //  CHAT-UPDATE
	deathnote.on('chat-update', async (mek) => {
		try {
		if (!mek.hasNewMessage) return
		mek = mek.messages.all()[0]
		if (!mek.message) return
		if (!mek.key.fromMe) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message

			global.prefixo
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const from2 = mek.key.participant  
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
			const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefixo)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefixo) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefixo) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefixo) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefixo)
			
			
//  -X-  //  DEFINIR O NÚMERO DO BOT/NÚMERO QUE ESTÁ ATIVO O BOT
const botNumber = deathnote.user.jid

//  -X-  //  DEFINIR OQUE É GRUPO
const isGroup = from.endsWith('@g.us') // -X- DEFINIR OQUE É GRUPO -X- //

//  -X-  //  PARA DEFINIR OS OUTROS BGLHS DO GRUPO
const groupMetadata = isGroup ? await deathnote.groupMetadata(from) : ''

//  -X-  //  DEFINIR NOME DO GRUPO
const groupName = isGroup ? groupMetadata.subject : ''

//  -X-  //  ID GRUPO
const groupId = isGroup ? groupMetadata.jid : ''

//  -X-  //  DEFINIR MEMBROS DO GRUPO
const groupMembers = isGroup ? groupMetadata.participants : ''

//  -X-  //  DEFINIR ADMS DO GRUPO
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''


//  -X-  //  RESPOSTAS RÁPIDAS
const reply = (teks) => {
deathnote.sendMessage(from, teks, text, {quoted:mek})
}

const sender = isGroup ? mek.participant : mek.key.remoteJid

const sendMess = (hehe, teks) => {
deathnote.sendMessage(hehe, teks, text)
}

const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? deathnote.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : deathnote.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
}


//  -X-  //  CORES RSRS
colors = ['red','white','black','blue','yellow','green']

//  -X-  //  DEFINIR MÍDIA
const isMedia = (type === 'imageMessage' || type === 'videoMessage')

//  -X-  //  DEFINIR SE A MSG MARCADA É UMA IMG
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')

//  -X-  //  DEFINIR SE A MSG MARCADA É UM VÍDEO
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')

//  -X-  //  DEFINIR SE A MSG MARCADA É UMA FIG
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

//  -X-  //  DASHBOARD
if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', hora, color(command))
if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', hora, color('MENSAGEM'))
if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', hora, color(command), 'NO GRUPO', color(groupName))
if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', hora, color('MENSAGEM'), 'NO GRUPO', color(groupName))

			switch(command) {
			
//  -X-  //  MENU
case 'menu':
case 'help':
foto = fs.readFileSync('./arquivos/fotos/fotomenu.png')
deathnote.sendMessage(from, foto, image, {quoted: mek, caption: menu(prefixo)})
break

//  -X-  //  FECHAR O GRUPO
case 'lock':
case 'lockgp':
case 'close':
case 'closegp':
case 'fechar':
case 'fechargp':
if (!isGroup) return reply('\n\n Este comando é apenas para grupos!!\n\n', text, {quoted: mek})
deathnote.groupSettingChange (from, GroupSettingChange.messageSend, true)
break

//  -X-  //  ABRIR O GRUPO
case 'open':
case 'opengp':
case 'unopen':
case 'unlock':
case 'unlockgp':
case 'abrir':
case 'abrirgp':
if (!isGroup) return reply('\n\n Este comando é apenas para grupos!!\n\n', text, {quoted: mek})
deathnote.groupSettingChange (from, GroupSettingChange.messageSend, false)
break
			
				default:
if (isGroup && budy != undefined) {
console.log(budy)
} else {
return
}
}
} catch (e) {
console.log('Error : %s', color(e, 'red'))
}
})
}
starts()

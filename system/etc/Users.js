import*as e from"../lib/index.js";export const newUser=async function({event:r,Umaru:s,umaru:a,cooldown:n}){if(n.isCooldown("createuser"+r.senderID,5))return;n.create("createuser"+r.senderID);const t=await s.getUserInfo(r.senderID);a.data.users.hasOwnProperty(r.senderID)||(a.data.users[r.senderID]={}),a.data.users[r.senderID].timeZone=0,t[r.senderID]&&t[r.senderID].name&&t[r.senderID].name.toLowerCase().includes("facebook user")?a.data.users[r.senderID].name="𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝗎𝗌𝖾𝗋":(a.data.users[r.senderID].name=t[r.senderID].name,a.data.users[r.senderID].firstName=t[r.senderID].firstName),a.data.users[r.senderID].gender=1===t[r.senderID].gender?"FEMALE":2===t[r.senderID].gender?"MALE":"NEUTER",a.data.users[r.senderID].active=!0,a.data.users[r.senderID].timeZone||(a.data.users[r.senderID].timeZone=0),a.data.users[r.senderID].money||(a.data.users[r.senderID].money=0),a.data.users[r.senderID].exp||(a.data.users[r.senderID].exp=1.5),e.log("DATABASE",t[r.senderID].name+" | "+r.senderID),await a.save(),a.allUserID=Object.keys(a.data.users)};export const cooldown=async function({event:e,Umaru:r,similarity:s,umaru:a,translate:n}){let t=1e3*a.client.cooldown.get(s.data),d=Date.now()-a.client.lastUsage[e.senderID][s.data],o=Math.min(Math.floor((t-d)/6e4)%60,59),i=Math.ceil((t-d)/1e3)%60,c=0<o?o+" minutes and "+i+" seconds":i+" seconds",u=i.toString(),D="1"==u[1]?"🕘":"2"==u[1]?"🕗":"3"==u[1]?"🕖":"4"==u[1]?"🕕":"5"==u[1]?"🕔":"6"==u[1]?"🕓":"7"==u[1]?"🕒":"8"==u[1]?"🕑":"9"==u[1]?"🕐":"0"==u[1]?"🕛":"1"==u[0]?"🕘":"2"==u[0]?"🕗":"3"==u[0]?"🕖":"4"==u[0]?"🕕":"5"==u[0]?"🕔":"6"==u[0]?"🕓":"7"==u[0]?"🕒":"8"==u[0]?"🕑":"9"==u[0]?"🕐":"0"==u[0]?"🕛":"⏳";return r.sendMessage((await n(a.config.cooldown_msg,e,null,!0)).replace("{{1}}",c).replace("{{2}}",D),e.threadID,e.messageID)};export const record=async function({event:e,info:r,Umaru:s,umaru:a,readThread:n,writeThread:t,cooldown:d}){if(d.isCooldown("createrecord"+e.threadID,5))return;d.create("createrecord"+e.threadID);const o=s.getCurrentUserID(),i=a.systemPath+"/data/Threads/"+e.threadID+"/Users";let c=await n(i);for(const e of r.userInfo)c[e.id]||(c[e.id]={}),c[e.id].name||(c[e.id].name=e.name),c[e.id].gender||(c[e.id].gender=e.gender),c[e.id].lastActive||(c[e.id].lastActive="Record not found"),c[o]||(c[o]={}),c[o].lastActive="None/Bot";for(const e of r.adminIDs)c[e.id].lastActive="Administrator";await t(i,c,!0)};
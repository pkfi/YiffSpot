var clients       = {};
var usersOnline   = 0;

module.exports = {
  getOnline: function() {
    return usersOnline;
  },
  incrementOnline: function() {
    return ++usersOnline;
  },
  decrementOnline: function() {
    return --usersOnline;
  },
  getAllClients: function() {
    return clients;
  },
  addClient: function(socket, token) {
    clients[token] = {
      id: token,
      socket: socket,
      preferences: null,
      partner: null,
      blocks: [],
    }
  },
  addPreferences: function(id, preferences) {
    clients[id].preferences = preferences;
  },
  removeClient: function(id) {
    delete clients[id];
  },
  findClient: function(id) {
    return clients[id];
  },
  pairPartners: function(id, partner) {
    clients[id].partner = partner;
    clients[partner].partner = id;
  },
  removePartner: function(id) {
    clients[id].partner = null;
  },
  blockPartner: function(id, partner) {
    clients[id].blocks.push(partner);
  },
  checkBlocks: function(id, partner) {
    if (clients[id] == undefined || clients[id].blocks == undefined) {
      return false;
    }

    var result = clients[id].blocks.indexOf(partner);

    if (result === -1) {
      return false;
    } else {
      return true;
    }
  },
}
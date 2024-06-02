const filterByPublished = (req, res, next) => {
    req.findFilter.state = 'published'
    next()
  }
  
  const filterAndSort = (req, res, next) => {
    
    const { author, title, tags, state } = req.query
    req.findFilter = {}
    if (author) req.findFilter.owner = new RegExp(`${author}`, 'gi')
    if (title) req.findFilter.title = new RegExp(`${title}`, 'gi')
    if (tags) {
      const tagAttributes = tags.split(',').map((tag) => new RegExp(`${tag}`, 'gi'))
      req.findFilter.tags = { $in: tagAttributes }
    }
    if (state && ['draft', 'published'].includes(state)) req.findFilter.state = state
  
    
    const { orderby } = req.query
    req.sort = {}
  
    if (orderby) {
      const sortAttributes = orderby.split(',')
      for (const attribute of sortAttributes) {
        if (attribute.startsWith('-')) {
          req.sort[attribute.slice(1)] = -1
        } else req.sort[attribute] = 1
      }
    }
  
    if ('author' in req.sort) {
      req.sort.owner = req.sort.author
      delete req.sort.author
    }
  
    const { fields } = req.query
    req.fields = {}
  
    if (fields) {
      const fieldsToDisplay = fields.split(',')
  
      for (const field of fieldsToDisplay) {
        if (field.startsWith('-')) {
          req.fields[field.slice(1)] = 0
        } else req.fields[field] = 1
      }
    }
  
    return next()
  }
  
  const list = (req, res, next) => {
    const fields = {
      title: 1,
      tags: 1,
    }
  
    
    req.fields === undefined ? (req.fields = fields) : (req.fields = Object.assign(req.fields, fields))
    next()
  }
  
  const setUserFilter = (req, res, next) => {
    const owner = new RegExp(`${req.user.username}`, 'gi')
    req.findFilter.owner = owner
    next()
  }
  
  module.exports = {
    filterByPublished,
    filterAndSort,
    list,
    setUserFilter,
  }
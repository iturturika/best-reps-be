import ItemModel from '../models/Item.js'

export const addItem = async (req, res) => {
    try {
        const doc = new ItemModel({
            label: req.body.label,
            images: req.body.images,
            price: req.body.price,
            url: req.body.url,
        })

        const item = await doc.save();

        res.json({
            message: 'Вещь добавлена'
        })
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось добавить!'
        })
    }
}

export const removeItem = async (req, res) => {
    try {
      const removedDoc = await ItemModel.findByIdAndDelete(req.body.id);
  
      if (!removedDoc) {
        return res.status(404).json({
            message: 'Вещь не найдена!'
        })
      }
  
      res.json({
        message: 'Удаленно!'
      })
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось удалить!'
        })
    }
};

export const getItems = async (req, res) => {
    try {
        const item = await ItemModel.find();

        if(!item || item.length === 0){
            return res.status(404).json({
                message: 'Вещи не найдены!'
            })
        }

        res.json(item);
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось найти вещи!'
        })
    }
}

export const getItemById = async (req, res) => {
    try {
        const item = await ItemModel.findById(req.params.id);
        
        if(!item || item.length === 0){
            return res.status(404).json({
                message: 'Вещь не найдена!'
            })
        }

        res.json(item);
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось найти вещь!'
        })
    }
}
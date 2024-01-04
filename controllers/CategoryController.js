import CategoryModel from '../models/Category.js'

export const addCategory = async (req, res) => {
    try {
        const doc = new CategoryModel({
            label: req.body.label
        })

        const category = await doc.save();

        res.json({
            message: 'Категория добавлена'
        })
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось добавить!'
        })
    }
}

export const removeCategory = async (req, res) => {
    try {
      const removedDoc = await CategoryModel.findByIdAndRemove(req.body.id);
  
      if (!removedDoc) {
        return res.status(404).json({
            message: 'Категория не найдена!'
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
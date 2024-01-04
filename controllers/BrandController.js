import BrandModel from '../models/Brand.js'

export const addBrand = async (req, res) => {
    try {
        const doc = new BrandModel({
            label: req.body.label
        })

        const brand = await doc.save();

        res.json({
            message: 'Бренд добавлен'
        })
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось добавить!'
        })
    }
}

export const removeBrand = async (req, res) => {
    try {
      const removedDoc = await BrandModel.findByIdAndDelete(req.body.id);
  
      if (!removedDoc) {
        return res.status(404).json({
            message: 'Бренд не найден!'
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

export const getBrands = async (req, res) => {
    try {
        const brands = await BrandModel.find();

        if(!brands || brands.length === 0){
            return res.status(404).json({
                message: 'Список пуст!'
            })
        }

        res.json(brands);
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось найти список!'
        })
    }
}
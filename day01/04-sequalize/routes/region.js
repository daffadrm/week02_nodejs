import { Router } from 'express';
import { sequelize } from '../models';
//import regionCtrl from '../controllers/regions.controller'

//declare const
const router = Router();

//findAll
//router.route('/').get(regionCtrl.allRegions);

router.get('/', async (req, res) => {
  const regions = await sequelize.query('SELECT region_id,region_name FROM regions', {
    type: sequelize.QueryTypes.SELECT,
    model: req.context.models.Regions,
    mapToModel: true
  });
  // const emps = await req.context.models.Employees.findAll();
  return res.send(regions);
});

router.get('/:regionId', async (req, res) => {
  const regions = await req.context.models.Regions.findByPk(
    req.params.regionId,
  );
  return res.send(regions);
});

router.post('/', async (req, res) => {
  const regions = await req.context.models.Regions.create({
    region_id: req.body.region_id,
    region_name: req.body.region_name,
  });

  return res.send(regions);
});

router.delete('/:regionId', async (req, res) => {
  const result = await req.context.models.Regions.destroy({
    where: { id: req.params.regionId },
  });

  return res.send(true);
});

export default router;
import Product from "../database/Product";
import Response from "../helpers/Response";
import codes from "../helpers/statusCode";


const ProductController = {
  create: async (req, res) => {
    const {
      name, description, price, category, image, color
    } = req.body;

    try {
      const product = await Product.create({
        name, description, price, category, image, color
      });
      return new Response.send(res, codes.success, {
        data: product
      });
    } catch (error) {
      return new Response.handleError(res, error); 
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const {
      name, description, price, category, image, color
    } = req.body;

    try {
      await Product.update({
        name, description, price, category, image, color
      },
      { where: { id } });
      const product = await Product.findByPk(id);
      return new Response.send(res, codes.success, {
        data: product
      });
    } catch (error) { 
      return new Response.handleError(res, err); 
    }
  },

  getOne: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      return new Response.send(res, codes.success, {
        data: product,
      });
    } catch (error) { console.log(error); return new Response.handleError(res, error); }
  },

  getAll: async (req, res) => {
    try {
      const products = await Product.findAll();
      return new Response.send(res, codes.success, {
        data: products,
      });
    } catch (error) { console.log(error); return new Response.handleError(res, error); }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await Product.destroy({
        where: { id }
      });
      return new Response.send(res, codes.success, {
        message: 'Deleted successfully.',
      });
    } catch (error) { return new Response.handleError(res, error); }
  }
}

export default ProductController;

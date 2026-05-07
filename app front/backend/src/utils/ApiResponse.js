/**
 * Standardized API Response
 * Ensures consistent response shape across all endpoints.
 */
class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success(res, message = 'Success', data = null, statusCode = 200) {
    return res.status(statusCode).json(new ApiResponse(statusCode, message, data));
  }

  static created(res, message = 'Created successfully', data = null) {
    return res.status(201).json(new ApiResponse(201, message, data));
  }

  static paginated(res, message, { docs, page, limit, total }) {
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message,
      data: docs,
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  }

  static noContent(res) {
    return res.status(204).send();
  }
}

module.exports = ApiResponse;

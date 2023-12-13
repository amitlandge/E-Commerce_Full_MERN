class ApiFeatures {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }
  search() {
    let keyword = this.queryStr.keyword;
    keyword = keyword
      ? {
          $or: [
            {
              name: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              description: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const copyField = { ...this.queryStr };
    const removeField = ["keyword", "page", "limit"];
    removeField.forEach((key) => {
      return delete copyField[key];
    });

    let queryStr = JSON.stringify(copyField);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(result) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = result * (currentPage - 1);
    this.query = this.query.limit(result).skip(skip);
    return this;
  }
}
module.exports = ApiFeatures;

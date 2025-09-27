/**
 * BaseModel provides a foundation class for all entity models in the application.
 * 
 * This class defines the common structure that all entity models should extend.
 * It includes a unique identifier field and an instance field for additional data.
 * 
 * @example
 * ```typescript
 * interface User extends BaseModel {
 *   name: string;
 *   email: string;
 *   createdAt: Date;
 * }
 * 
 * class UserModel extends BaseModel implements User {
 *   name!: string;
 *   email!: string;
 *   createdAt!: Date;
 * }
 * ```
 */
export class BaseModel {
  /**
   * Unique identifier for the entity.
   * Typically corresponds to the database primary key or MongoDB ObjectId.
   */
  _id?: string;
  
  /**
   * Additional instance data that can be attached to the model.
   * Useful for storing metadata or computed properties.
   */
  instance?: Record<string, unknown>;
}